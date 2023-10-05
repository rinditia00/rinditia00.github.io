// Function to fetch and update Bitcoin price from Binance
function fetchBitcoinPrice() {
    const bitcoinPriceElement = document.getElementById('bitcoin-price');
    
    // Make an AJAX request to the Binance public API for Bitcoin price
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const bitcoinPrice = parseFloat(response.price).toFixed(2); // Extract Bitcoin price
            
            // Update the HTML element with the new price
            bitcoinPriceElement.textContent = `$${bitcoinPrice}`;
        }
    };
    
    xhr.send();
}

// Fetch Bitcoin price from Binance initially
fetchBitcoinPrice();

// Fetch Bitcoin price from Binance every second
setInterval(fetchBitcoinPrice, 1000);
