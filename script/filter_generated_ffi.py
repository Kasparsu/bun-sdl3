import re
from pathlib import Path

exports_file = Path('/tmp/sdl_exports.txt')
input_file = Path('script/generated-ffi-block.txt')
output_file = Path('script/generated-ffi-filtered.txt')

exports = set()
if exports_file.exists():
    for line in exports_file.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        name = line.split('@@', 1)[0]
        exports.add(name)
else:
    print('ERROR: exports file not found:', exports_file)
    raise SystemExit(1)

pat = re.compile(r'^\s*([A-Za-z0-9_]+)\s*:')

if not input_file.exists():
    print('ERROR: input file not found:', input_file)
    raise SystemExit(1)

lines = input_file.read_text().splitlines(keepends=True)
out_lines = []
i = 0
while i < len(lines):
    m = pat.match(lines[i])
    if m:
        name = m.group(1)
        if name in exports:
            # include this block
            out_lines.append(lines[i])
            i += 1
            # include following lines until a line that ends with '},' or '}'
            while i < len(lines):
                out_lines.append(lines[i])
                if lines[i].strip().endswith('},') or lines[i].strip().endswith('}'):
                    i += 1
                    break
                i += 1
            continue
    i += 1

header = '// Filtered generated FFI mapping — only symbols exported by the installed lib\n\n'
output_file.write_text(header + ''.join(out_lines))
print('WROTE', output_file, 'lines=', len(out_lines))
