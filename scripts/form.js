// scripts/form.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];

    const select = document.getElementById('productSelect');

    // build options
    products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;            // requirement: id used for option value
        opt.textContent = p.name;    // name used for display
        select.append(opt);
    });

    // small UX: when user focuses rating via keyboard, show hint by toggling outline
    const ratingInputs = document.querySelectorAll('.rating-row input[type="radio"]');
    ratingInputs.forEach(r => {
        r.addEventListener('focus', () => r.parentElement.classList.add('focused'));
        r.addEventListener('blur', () => r.parentElement.classList.remove('focused'));
    });

    // simple pattern: ensure form valid before submit (HTML5 will check required)
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', (e) => {
        // Let HTML5 handle required validation; but we can show a friendly message if rating missing
        const rating = form.querySelector('input[name="rating"]:checked');
        if (!rating) {
            e.preventDefault();
            alert('Please select an overall rating (1–5 stars).');
            return;
        }
        // allowed to submit — browser will send GET to review.html with query string
    });
});
