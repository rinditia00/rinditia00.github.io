// Function to fetch and update Bitcoin price from Binance
function fetchBitcoinPrice() {
    const bitcoinPriceElement = document.getElementById('bitcoin-price');
    
    // Make an AJAX request to the Binance public API for Bitcoin price
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const newBitcoinPrice = parseFloat(response.price);
            
            // Get the previous Bitcoin price stored in a data attribute
            const prevBitcoinPrice = parseFloat(bitcoinPriceElement.getAttribute('data-prev-price'));
            
            // Update the data attribute with the new price
            bitcoinPriceElement.setAttribute('data-prev-price', newBitcoinPrice);
            
            // Update the HTML element with the new price
            bitcoinPriceElement.textContent = `$${newBitcoinPrice.toFixed(2)}`;
            
            // Check if the price went up, down, or stayed the same
            if (newBitcoinPrice > prevBitcoinPrice) {
                // Price went up, blink green
                bitcoinPriceElement.style.color = 'green';
                setTimeout(() => {
                    bitcoinPriceElement.style.color = 'black'; // Return to black
                }, 1000); // Blink for 1 second
            } else if (newBitcoinPrice < prevBitcoinPrice) {
                // Price went down, blink red
                bitcoinPriceElement.style.color = 'red';
                setTimeout(() => {
                    bitcoinPriceElement.style.color = 'black'; // Return to black
                }, 1000); // Blink for 1 second
            }
        }
    };
    
    xhr.send();
}

// Fetch Bitcoin price from Binance initially
fetchBitcoinPrice();

// Fetch Bitcoin price from Binance every second
setInterval(fetchBitcoinPrice, 1000);
