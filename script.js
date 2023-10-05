// Function to fetch and update cryptocurrency prices from Binance
function fetchCryptoPrices() {
    const coins = ['BTC', 'LTC', 'ETH', 'XRP', 'ADA', 'SUI', 'WLD', 'MATIC'];

    coins.forEach(coin => {
        const coinElement = document.getElementById(`${coin}-price`);
        
        // Make an AJAX request to the Binance public API for coin price
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const coinPrice = parseFloat(response.price).toFixed(2); // Extract coin price
                
                // Update the HTML element with the new price
                coinElement.textContent = `$${coinPrice}`;
                
                // Check if the price went up, down, or stayed the same
                const prevCoinPrice = parseFloat(coinElement.getAttribute('data-prev-price'));
                if (!isNaN(prevCoinPrice) && coinPrice > prevCoinPrice) {
                    // Price went up, blink green
                    coinElement.style.color = 'green';
                    setTimeout(() => {
                        coinElement.style.color = 'black'; // Return to black
                    }, 1000); // Blink for 1 second
                } else if (!isNaN(prevCoinPrice) && coinPrice < prevCoinPrice) {
                    // Price went down, blink red
                    coinElement.style.color = 'red';
                    setTimeout(() => {
                        coinElement.style.color = 'black'; // Return to black
                    }, 1000); // Blink for 1 second
                }
                
                // Update the data attribute with the new price
                coinElement.setAttribute('data-prev-price', coinPrice);
            }
        };
        
        xhr.send();
    });
}

// Fetch cryptocurrency prices from Binance initially
fetchCryptoPrices();

// Fetch cryptocurrency prices from Binance every second
setInterval(fetchCryptoPrices, 1000);
