/* FNDI Language Toggle — EN / ES */
(function(){
  // Inject CSS for the toggle button
  var style = document.createElement('style');
  style.textContent = '.lang-btn{position:fixed;top:20px;right:20px;z-index:1001;background:rgba(124,58,237,0.15);backdrop-filter:blur(12px);border:1px solid rgba(124,58,237,0.3);color:#a78bfa;font-size:0.82rem;font-weight:700;padding:0.45rem 0.9rem;border-radius:30px;cursor:pointer;transition:all 0.25s;font-family:"Inter",-apple-system,sans-serif;letter-spacing:0.5px}.lang-btn:hover{background:rgba(124,58,237,0.25);color:#c4b5fd;transform:translateY(-1px);box-shadow:0 4px 15px rgba(124,58,237,0.2)}@media(max-width:768px){.lang-btn{top:auto;bottom:80px;right:16px;font-size:0.78rem;padding:0.4rem 0.8rem}}';
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
      btn.innerHTML = lang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
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
    btn.innerHTML = lang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    btn.onclick = function(){
      var current = getLang();
      applyLang(current === 'es' ? 'en' : 'es');
    };
    document.body.appendChild(btn);
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
