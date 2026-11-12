// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
function setMenu(open) {
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
}
hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('active')));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });

// Hairline under the nav once the page moves
const nav = document.getElementById('main-nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hero demo: a clickable example of a lead ad and its form
(function () {
    const demo = document.getElementById('leadDemo');
    if (!demo) return;
    const steps = [...demo.querySelectorAll('.demo-step')];
    const dots = [...demo.querySelectorAll('.demo-progress span')];
    let at = 0;
    function show(i) {
        at = i;
        steps.forEach((s, n) => s.classList.toggle('active', n === i));
        dots.forEach((d, n) => d.classList.toggle('on', n <= i));
    }
    demo.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => show(at + 1)));
    demo.querySelectorAll('.demo-options').forEach(group => {
        group.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
            const out = document.getElementById(group.dataset.answer === 'need' ? 'leadNeed' : 'leadWhen');
            out.textContent = b.textContent;
            show(at + 1);
        }));
    });
    demo.querySelector('[data-restart]').addEventListener('click', () => show(0));
    show(0);
})();

// FAQ
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const open = btn.parentElement.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
    });
});
