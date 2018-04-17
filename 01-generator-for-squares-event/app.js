var LinkGenerator = {

    target: null,

    init: function () {
        this.generateBtn    = document.getElementById('generate');
        this.showResultBtn  = document.getElementById('show-result');
        this.resetBtn       = document.getElementById('reset');
        this.oneTable       = document.querySelector('table');
        this.items          = document.querySelectorAll('table td');

        this.events();
    },

    events: function () {
        this.showResultBtn.addEventListener( 'click', this.showResults.bind(this) );
        this.generateBtn.addEventListener( 'click', this.randomClick.bind(this) );
        this.resetBtn.addEventListener( 'click', this.reset.bind(this) );
        this.oneTable.addEventListener( 'click', this.catchClickTarget.bind(this) );
    },

    randomClick: function (e) {
        for(var i = 0; i < this.items.length; i++) {
            var randomNum = Math.floor(Math.random() * this.items.length);

            this.items[randomNum].dataset.quantity = +this.items[randomNum].dataset.quantity + 1;
        }
    },

    showResults: function () {
        this.showQuantity();
        this.changeBackground();
    },

    reset: function (e) {
        for(var i = 0; i < this.items.length; i++) {
            this.items[i].innerHTML = '';
            this.items[i].dataset.quantity = '0';
            this.items[i].dataset.color = 'white';
        }
    },

    showQuantity: function () {
        for(var i = 0; i < this.items.length; i++) {
            this.items[i].innerHTML = this.items[i].dataset.quantity;
        }
    },

    changeBackground: function () {
        for(var i = 0; i < this.items.length; i++) {
            this.checkCondition(this.items[i].dataset.quantity, this.items[i].dataset);
        }
    },

    checkCondition: function (quantityNumber, datasetColor) {
        if ( quantityNumber >= 0 && quantityNumber < 25 ) {
            datasetColor.color = 'white';
        } else if ( quantityNumber >= 25 && quantityNumber < 50 ) {
            datasetColor.color = 'drover';
        } else if ( quantityNumber >= 50 && quantityNumber < 75 ) {
            datasetColor.color = 'tangerine-yello';
        } else if ( quantityNumber >= 75 ) {
            datasetColor.color = 'dark-orange';
        }
    },
    
    /*additional functionality*/
    catchClickTarget: function (e) {
        this.target = e.target;
        this.target.dataset.quantity = +this.target.dataset.quantity + 1;

        this.changeBackgroundTarget();
        this.showQuantityTarget();
    },

    changeBackgroundTarget: function () {
        this.checkCondition(+this.target.dataset.quantity, this.target.dataset);
    },

    showQuantityTarget: function () {
        if (this.target.tagName == "TD") {
            this.target.innerHTML = this.target.dataset.quantity;
        }
    }

}

LinkGenerator.init();