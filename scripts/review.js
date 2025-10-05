// scripts/review.js
document.addEventListener('DOMContentLoaded', () => {
    // parse query string into object
    const params = new URLSearchParams(window.location.search);

    // helper to read repeated fields (checkboxes with same name)
    function getAll(name) {
        const values = [];
        for (const [k, v] of params.entries()) {
            if (k === name) values.push(v);
        }
        return values;
    }

    // map product id back to readable name if possible (we reconstruct the array used earlier)
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];

    function productNameFromId(id) {
        const found = products.find(p => p.id === id);
        return found ? found.name : id;
    }

    // read fields (note: GET sends multiple features pairs)
    const productId = params.get('product') || 'Unknown';
    const rating = params.get('rating') || 'N/A';
    const installed = params.get('installed') || 'N/A';
    const features = getAll('features'); // may be [] if none
    const reviewText = params.get('review') || '';
    const reviewer = params.get('name') || '';

    // create HTML output
    const out = document.getElementById('submittedData');
    const productName = productNameFromId(productId);

    out.innerHTML = `
    <p><strong>Product:</strong> ${productName}</p>
    <p><strong>Overall Rating:</strong> ${rating} / 5</p>
    <p><strong>Date of Installation:</strong> ${installed}</p>
    <p><strong>Features noted:</strong> ${features.length ? features.join(', ') : 'None'}</p>
    <p><strong>Written review:</strong><br>${reviewText ? escapeHtml(reviewText) : '<em>(none)</em>'}</p>
    <p><strong>Reviewer:</strong> ${reviewer ? escapeHtml(reviewer) : '<em>Anonymous</em>'}</p>
  `;

    // localStorage counter (key: productReviewCount)
    const key = 'productReviewCount';
    let count = parseInt(localStorage.getItem(key) || '0', 10);
    // increment only if page has a product value (basic guard)
    if (productId !== null && productId !== '') {
        count = count + 1;
        localStorage.setItem(key, String(count));
    }
    document.getElementById('countText').textContent = `Total submissions from this browser: ${count}`;

    // helper: basic sanitize for showing user text (very simple)
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // update footer last modified and year (so consistent)
    const yearEl = document.getElementById('currentyear');
    const lastModEl = document.getElementById('lastModified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModEl) lastModEl.textContent = 'Last Modification: ' + document.lastModified;
});
