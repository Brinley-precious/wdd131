// week04/scripts/lazyload.js
document.addEventListener('DOMContentLoaded', () => {
    // Footer: current year & document last modified
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const lastEl = document.getElementById('lastModified');
    if (lastEl) lastEl.textContent = 'Last Modified: ' + document.lastModified;

    // Add fade animation when each image completes loading.
    // Images use native loading="lazy"; we listen to the load event (fires when the resource actually loads)
    const images = document.querySelectorAll('.img-wrapper img');

    images.forEach(img => {
        // when an img finishes loading, mark its wrapper as loaded (trigger CSS transitions)
        const markLoaded = () => {
            const wrapper = img.closest('.img-wrapper');
            if (wrapper) wrapper.classList.add('loaded');
        };

        // Attach listener
        img.addEventListener('load', markLoaded);

        // In some cases image may be cached and already complete
        if (img.complete && img.naturalWidth !== 0) {
            // small timeout to allow paint
            setTimeout(markLoaded, 50);
        }
    });
});
