"""Merge the per-page Spanish strings in _i18n/*.json into lang.js.

Each JSON file looks like {"path": "/about/", "strings": {"English": "Español"}}.
The merged block is written between the i18n:generated markers in lang.js.
Run from the repo root:  python3 tools-merge-i18n.py
"""
import glob, json, re

START, END = '  // i18n:generated:start', '  // i18n:generated:end'
gen = {}
for f in sorted(glob.glob('_i18n/*.json')):
    d = json.load(open(f, encoding='utf-8'))
    gen.setdefault(d['path'], {}).update(d['strings'])

block = (START + '\n  var generated = ' + json.dumps(gen, ensure_ascii=False, indent=1) + ';\n'
         "  for (var gp in generated) {\n"
         "    pages[gp] = pages[gp] || {};\n"
         "    for (var gk in generated[gp]) pages[gp][gk] = generated[gp][gk];\n"
         "    // the not-found page can be served at any path\n"
         "    if (gp === '/404/') for (var nk in generated[gp]) shared[nk] = shared[nk] || generated[gp][nk];\n"
         "  }\n" + END)

src = open('lang.js', encoding='utf-8').read()
if START in src:
    src = re.sub(re.escape(START) + r'.*?' + re.escape(END), lambda m: block, src, flags=re.S)
else:
    anchor = '  // ─── Build a flat lookup for current page ───'
    assert anchor in src
    src = src.replace(anchor, block + '\n\n' + anchor, 1)
open('lang.js', 'w', encoding='utf-8').write(src)
print('merged', len(gen), 'pages,', sum(len(v) for v in gen.values()), 'strings')
