/* FNDI Language Toggle — EN / ES */
(function(){
  // Inject CSS for the toggle button
  var style = document.createElement('style');
  style.textContent = '.lang-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;font-size:0.85rem;font-weight:600;padding:0.45rem 0.9rem;border-radius:8px;cursor:pointer;transition:all 0.25s;font-family:"Inter",-apple-system,sans-serif;letter-spacing:0.3px;display:flex;align-items:center;gap:0.4rem}.lang-btn:hover{background:rgba(124,58,237,0.15);border-color:rgba(124,58,237,0.3);color:#fff;transform:translateY(-1px)}';
  document.head.appendChild(style);

  function getLang(){
    try { return localStorage.getItem('fndi-lang') || 'en'; } catch(e){ return 'en'; }
  }
  function setLang(l){
    try { localStorage.setItem('fndi-lang', l); } catch(e){}
  }

  function applyLang(lang){
    document.querySelectorAll('[data-es]').forEach(function(el){
      if(!el.hasAttribute('data-en')){
        el.setAttribute('data-en', el.innerHTML);
      }
      if(lang === 'es'){
        el.innerHTML = el.getAttribute('data-es');
      } else {
        el.innerHTML = el.getAttribute('data-en');
      }
    });
    var btn = document.getElementById('lang-toggle');
    if(btn){
      btn.innerHTML = lang === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }
    document.documentElement.lang = lang;
    setLang(lang);
  }

  function injectToggle(){
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-btn';
    var lang = getLang();
    btn.innerHTML = lang === 'es' ? 'EN' : 'ES';
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    btn.onclick = function(){
      var current = getLang();
      applyLang(current === 'es' ? 'en' : 'es');
    };
    // Insert into nav, before the first item (left of Services)
    var navLinks = document.querySelector('.n-links');
    if(navLinks && navLinks.firstChild){
      navLinks.insertBefore(btn, navLinks.firstChild);
    } else {
      document.body.appendChild(btn);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      injectToggle();
      if(getLang() === 'es') applyLang('es');
    });
  } else {
    injectToggle();
    if(getLang() === 'es') applyLang('es');
  }
})();
