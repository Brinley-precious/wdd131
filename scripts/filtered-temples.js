/* filtered-temples.js
   Complete client-side code: temples array, render, filters, mobile nav, footer dates.
   Replace the contents of scripts/filtered-temples.js with this file.
*/

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // 3 additional sample temples (you can edit or add your own)
    {
        templeName: "Abuja Nigeria",
        location: "Abuja, Nigeria",
        dedicated: "2004, May, 14",
        area: 12000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/abuja-nigeria/400x250/abuja-nigeria-temple.jpeg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 9500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple.jpg"
    },
    {
        templeName: "Orem Utah",
        location: "Orem, Utah, United States",
        dedicated: "2016, January, 10",
        area: 10200,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/orem-utah/400x250/orem-utah-temple.jpg"
    }
];

/* ===== Helper functions ===== */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getYearFromString(dedicated) {
    // Finds first 4-digit year in the string
    if (!dedicated) return null;
    const m = String(dedicated).match(/(\d{4})/);
    return m ? Number(m[1]) : null;
}

/* ===== Rendering ===== */
function createTempleHTML(t) {
    // build a single card using template literals
    return `
    <figure class="temple-card">
      <img
        src="${escapeHtml(t.imageUrl)}"
        alt="${escapeHtml(t.templeName)}"
        loading="lazy"
        width="400"
        height="250"
      />
      <figcaption>
        <strong>${escapeHtml(t.templeName)}</strong><br/>
        <span class="location">${escapeHtml(t.location)}</span><br/>
        <small class="meta">Dedic.: ${escapeHtml(t.dedicated)} &nbsp;|&nbsp; Area: ${t.area.toLocaleString()} ft²</small>
      </figcaption>
    </figure>
  `;
}

function renderTemples(list) {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        console.warn('Gallery element not found (.gallery).');
        return;
    }
    gallery.innerHTML = list.map(createTempleHTML).join('');
}

/* ===== Filters ===== */
function filterAll() {
    return temples;
}
function filterOld() {
    return temples.filter(t => {
        const y = getYearFromString(t.dedicated);
        return y && y < 1900;
    });
}
function filterNew() {
    return temples.filter(t => {
        const y = getYearFromString(t.dedicated);
        return y && y > 2000;
    });
}
function filterLarge() {
    return temples.filter(t => Number(t.area) > 90000);
}
function filterSmall() {
    return temples.filter(t => Number(t.area) < 10000);
}

/* ===== DOM interactions & event wiring ===== */
document.addEventListener('DOMContentLoaded', () => {
    const navList = document.querySelector('.nav-list');
    const gallery = document.querySelector('.gallery');
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const yearSpan = document.getElementById('currentyear');
    const lastMod = document.getElementById('lastModified');

    // initial render (Home)
    renderTemples(filterAll());

    // nav click handling (event delegation)
    if (navList) {
        navList.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (!anchor) return;
            e.preventDefault();

            // wayfinding - active class
            navList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            anchor.classList.add('active');

            const key = anchor.textContent.trim().toLowerCase();

            let result;
            switch (key) {
                case 'home':
                    result = filterAll();
                    break;
                case 'old':
                    result = filterOld();
                    break;
                case 'new':
                    result = filterNew();
                    break;
                case 'large':
                    result = filterLarge();
                    break;
                case 'small':
                    result = filterSmall();
                    break;
                default:
                    result = filterAll();
            }

            renderTemples(result);

            // Close mobile nav if open (better UX)
            if (primaryNav && primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                if (menuToggle) menuToggle.classList.remove('open');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }

            // focus gallery for accessibility
            if (gallery) gallery.focus && gallery.focus();
        });
    }

    /* ===== Mobile hamburger nav behavior ===== */
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const isOpen = menuToggle.classList.toggle('open');
            primaryNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        });

        // close on outside click
        document.addEventListener('click', (ev) => {
            if (primaryNav.classList.contains('open')) {
                if (!primaryNav.contains(ev.target) && !menuToggle.contains(ev.target)) {
                    primaryNav.classList.remove('open');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation');
                }
            }
        });

        // Escape key closes nav
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open navigation');
                menuToggle.focus();
            }
        });
    }

    /* ===== Footer dynamic content ===== */
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = 'Last Modification: ' + document.lastModified;
});
