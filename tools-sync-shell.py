"""Copy the nav and footer from index.html into every page that has shell markers."""
import re, glob
src = open('index.html').read()
parts = {k: re.search(r'<!-- shell:%s -->.*?<!-- /shell:%s -->' % (k, k), src, flags=re.S).group(0) for k in ('nav', 'footer')}
for f in glob.glob('**/*.html', recursive=True):
    if f in ('index.html',): continue
    s = open(f).read()
    if '<!-- shell:nav -->' not in s: continue
    for k, v in parts.items():
        s = re.sub(r'<!-- shell:%s -->.*?<!-- /shell:%s -->' % (k, k), lambda m: v, s, flags=re.S)
    open(f, 'w').write(s)
    print('synced', f)
