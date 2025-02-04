/**
 * Potato Clicker Script
 */

let potatoCount = 0;
let farmerCount = 0;
let money = 0;


const potatoPrice = 1.40;

document.addEventListener('DOMContentLoaded', function() {
	const potatoCountEl = document.getElementById('potatoCount');
	const moneyEl = document.getElementById('money');
	const createPotatoBtn = document.getElementById('createPotato');
	const sellPotatoBtn = document.getElementById('sellPotato');
	const buyFarmerBtn = document.getElementById('buyFarmer');

	function updateDisplay() {
		potatoCountEl.textContent = potatoCount;
		moneyEl.textContent = money;
	}
	
	createPotatoBtn.addEventListener('click', function() {
		potatoCount++;
		updateDisplay();
	});

	sellPotatoBtn.addEventListener('click', function() {
		if (potatoCount > 0) {
			potatoCount--;
			money += potatoPrice;
			updateDisplay();
		} else {
			alert('No potatoes available to sell!');
		}
	});

	buyFarmerBtn.addEventListener('click', function() {
		if ( money >= 10 ) {
			money -= 10;
			farmerCount++;
		}
		
		updateDisplay();
	});

	setInterval(() => {
		potatoCount += farmerCount;
		updateDisplay();
	}, 1000);

	updateDisplay();
});

