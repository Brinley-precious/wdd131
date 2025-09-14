// temples.js - hamburger toggle + footer dynamic dates + accessibility helpers
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navList = primaryNav.querySelector('.nav-list');

    // Toggle nav visibility on mobile
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menuToggle.classList.toggle('open');     // toggles X icon
        primaryNav.classList.toggle('open');                    // shows/hides nav-list
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close nav if clicking outside nav (mobile)
    document.addEventListener('click', (e) => {
        if (primaryNav.classList.contains('open') &&
            !primaryNav.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            primaryNav.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
        }
    });

    // Close nav after clicking a link (mobile)
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.matchMedia('(max-width: 899px)').matches) {
            primaryNav.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.focus();
        }
    });

    // Close nav with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
            primaryNav.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.focus();
        }
    });

    // Footer dynamic year and lastModified
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const lastMod = document.getElementById('lastModified');
    if (lastMod) lastMod.textContent = 'Last Modification: ' + document.lastModified;
});
