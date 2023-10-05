// Function to fetch and update cryptocurrency prices from Binance
let consecutiveNoChangeCount = 0; // Initialize a count for consecutive no changes

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
                const coinPrice = parseFloat(response.price); // Extract coin price
                
                // Check if the price has changed
                const prevCoinPrice = parseFloat(coinElement.getAttribute('data-prev-price'));
                if (!isNaN(prevCoinPrice) && coinPrice !== prevCoinPrice) {
                    // Price has changed, update the HTML element and reset consecutiveNoChangeCount
                    const formattedPrice = coinPrice < 10 ? coinPrice.toFixed(5) : coinPrice.toFixed(2);
                    coinElement.textContent = `$${formattedPrice}`;
                    coinElement.style.color = coinPrice > prevCoinPrice ? 'green' : 'red';
                    consecutiveNoChangeCount = 0;
                } else {
                    // Price has not changed, increment consecutiveNoChangeCount
                    consecutiveNoChangeCount++;
                    coinElement.style.color = 'black'; // Set color to black
                }
                
                // Update the data attribute with the new price
                coinElement.setAttribute('data-prev-price', coinPrice);
            }
        };
        
        xhr.send();
    });
    
    // Check if there have been three consecutive no changes, if so, reset the color to black
    if (consecutiveNoChangeCount >= 3) {
        coins.forEach(coin => {
            const coinElement = document.getElementById(`${coin}-price`);
            coinElement.style.color = 'black';
        });
    }
}

// Fetch cryptocurrency prices from Binance initially
fetchCryptoPrices();

// Fetch cryptocurrency prices from Binance every second
setInterval(fetchCryptoPrices, 1000);
