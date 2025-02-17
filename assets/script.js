/**
 * Potato Clicker Game
 */
class PotatoClicker {
	constructor() {
		// Game State
		this.potatoCount = 0;
		this.farmerCount = 0;
		this.mineCount = 0;
		this.money = 0;
		this.potatoPrice = 0.55;
		this.farmerCost = 10;
		this.mineCost = 100;
		this.potatoSalesPerSecond = 0;


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
		this.mineCountEl = document.getElementById('mineCount');
		this.mineProductionEl = document.getElementById('mineProduction');
		this.buyMineBtn = document.getElementById('buyMine');
		this.sellPotatoBtn = document.getElementById('sellPotato');
		this.potatoSellPriceInput = document.getElementById('potatoSellPriceInput');
        this.potatoSellPrice = document.getElementById('potatoSellPrice');
        this.potatoSellRate = document.getElementById('potatoSellRate');
	}

	/**
	 * Bind event listeners to the buttons.
	 */
	bindEvents() {
		this.createPotatoBtn.addEventListener('click', this.handleCreatePotato.bind(this));
		this.sellPotatoBtn.addEventListener('click', this.handleSellPotato.bind(this));
		this.buyFarmerBtn.addEventListener('click', this.handleBuyFarmer.bind(this));
		this.buyMineBtn.addEventListener('click', this.handleBuyMine.bind(this));
		this.potatoSellPriceInput.addEventListener('change', this.handleSellPotatoPriceChange.bind(this));
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

		this.mineCountEl.textContent = this.mineCount;
		this.mineProductionEl.textContent = this.mineCount*5+' potato / sec';

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

		if (this.money >= this.mineCost) {
			this.buyMineBtn.removeAttribute('disabled');
		} else {
			this.buyMineBtn.setAttribute('disabled', 'disabled');
		}
	
	}
	/**
     * Handler for changing the potato sell price.
     */
    handleSellPotatoPriceChange() {
        const minInput = 0.1;
        const maxInput = 3.0;

        const potatoPrice = parseFloat(this.potatoSellPriceInput.value);
        this.potatoSellPrice.textContent = potatoPrice.toFixed(2);

        const clampedInput = Math.min(Math.max(potatoPrice, minInput), maxInput);
        this.potatoSalesPerSecond = Math.round(((maxInput - clampedInput) / (maxInput - minInput)) * 500);
        
        this.potatoSellRate.textContent = this.potatoSalesPerSecond.toFixed(0);
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
	 * Handler for buying a mine.
	 */
	handleBuyMine() {
		if (this.money >= this.mineCost) {
			this.money -= this.mineCost;
			this.mineCount++;
		} else {
			alert('Not enough money to buy a mine!');
		}
	}

	/**
	 * Automatically increment the potato count based on the number of farmers.
	 */
	startAutoIncrement() {
		setInterval(() => {
			this.potatoCount += this.farmerCount;
			this.potatoCount += this.mineCount*5;
		}, 1000);
		setInterval(() => {
            if (this.potatoCount === 0) {
                return;
            }

            if (this.potatoCount >= this.potatoSalesPerSecond) {
                this.potatoCount -= this.potatoSalesPerSecond;
                this.money += this.potatoPrice * this.potatoSalesPerSecond;
            } else {
                this.money += this.potatoPrice * this.potatoCount;
                this.potatoCount = 0;
            }
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
