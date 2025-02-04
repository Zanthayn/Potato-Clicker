/**
 * Potato Clicker Game
 */
class PotatoClicker {
	constructor() {
		// Game State
		this.potatoCount = 0;
		this.farmerCount = 0;
		this.money = 0;
		this.potatoPrice = 0.55;
		this.farmerCost = 10;

		// Cache DOM Elements
		this.cacheDOMElements();

		// Bind Event Listeners
		this.bindEvents();

		// Start the auto-increment timer (farmers produce potatoes every second)
		this.startAutoIncrement();

		// Start rendering.
		this.startRendering();
	}

	/**
	 * Cache references to the DOM elements.
	 */
	cacheDOMElements() {
		this.potatoCountEl = document.getElementById('potatoCount');
		this.moneyEl = document.getElementById('money');
		this.createPotatoBtn = document.getElementById('createPotato');
		this.sellPotatoBtn = document.getElementById('sellPotato');
		this.buyFarmerBtn = document.getElementById('buyFarmer');
		this.farmerCountEl = document.getElementById('farmerCount');
		this.farmerProductionEl = document.getElementById('farmerProduction');
	}

	/**
	 * Bind event listeners to the buttons.
	 */
	bindEvents() {
		this.createPotatoBtn.addEventListener('click', this.handleCreatePotato.bind(this));
		this.sellPotatoBtn.addEventListener('click', this.handleSellPotato.bind(this));
		this.buyFarmerBtn.addEventListener('click', this.handleBuyFarmer.bind(this));
	}

	/**
	 * Update the display elements with the current state.
	 */
	updateDisplay() {
		this.potatoCountEl.textContent = this.potatoCount;
		// Display money with two decimal places
		this.moneyEl.textContent = '£'+this.money.toFixed(2);

		this.farmerCountEl.textContent = this.farmerCount;
		this.farmerProductionEl.textContent = this.farmerCount+' potato / sec';

		if (this.potatoCount > 0) {
			this.sellPotatoBtn.removeAttribute('disabled');
		} else {
			this.sellPotatoBtn.setAttribute('disabled', 'disabled');
		}

		if (this.money >= this.farmerCost) {
			this.buyFarmerBtn.removeAttribute('disabled');
		} else {
			this.buyFarmerBtn.setAttribute('disabled', 'disabled');
		}
	}

	/**
	 * Handler for creating a potato.
	 */
	handleCreatePotato() {
		this.potatoCount++;
		this.updateDisplay();
	}

	/**
	 * Handler for selling a potato.
	 */
	handleSellPotato() {
		if (this.potatoCount > 0) {
			this.potatoCount--;
			this.money += this.potatoPrice;
		} else {
			alert('No potatoes available to sell!');
		}
	}

	/**
	 * Handler for buying a farmer.
	 */
	handleBuyFarmer() {
		if (this.money >= this.farmerCost) {
			this.money -= this.farmerCost;
			this.farmerCount++;
		} else {
			alert('Not enough money to buy a farmer!');
		}
	}

	/**
	 * Automatically increment the potato count based on the number of farmers.
	 */
	startAutoIncrement() {
		setInterval(() => {
			this.potatoCount += this.farmerCount;
		}, 1000);
	}

	/**
	 * Automatically re-render.
	 */
	startRendering() {
		setInterval(() => {
			this.updateDisplay();
		}, 50);
	}
}

// Initialize the game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	new PotatoClicker();
});
