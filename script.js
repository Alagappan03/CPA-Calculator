const currencySymbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥',
    'SGD': 'S$',
    'AED': 'د.إ',
    'CAD': 'C$',
    'AUD': 'A$',
    'RUB': '₽',
    'ZAR': 'R'
};

const currencySelect = document.getElementById('currency');
const currencySymbolSpan = document.getElementById('currency-symbol');

currencySelect.addEventListener('change', function() {
    const symbol = currencySymbols[this.value] || '';
    currencySymbolSpan.textContent = `(${symbol})`;
});

document.getElementById('cpa-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const adSpend = parseFloat(document.getElementById('adSpend').value);
    const acquisitions = parseInt(document.getElementById('acquisitions').value);
    const resultDiv = document.getElementById('result');
    const currency = currencySelect.value;
    const symbol = currencySymbols[currency] || '';

    if (adSpend >= 0 && acquisitions > 0) {
        const cpa = adSpend / acquisitions;
        animateCPA(resultDiv, cpa, symbol, currency);
    } else {
        resultDiv.textContent = 'Please enter valid values.';
    }

// Animate CPA function
function animateCPA(element, targetValue, symbol, currency) {
    const duration = 1200; // ms
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    let current = 0;
    const start = 0;
    const end = targetValue;
    function animate() {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        current = start + (end - start) * eased;
        element.textContent = `Your CPA is ${symbol}${current.toFixed(2)} (${currency})`;
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = `Your CPA is ${symbol}${end.toFixed(2)} (${currency})`;
        }
    }
    animate();
}
});
