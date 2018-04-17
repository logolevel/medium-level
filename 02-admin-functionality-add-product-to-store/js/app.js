var productForm = {
    valueTitle: null,
    valueSKU: null,
    valuePrice: null,
    valueDescription: null,
    valueAvailable: null,
    flagValidatedData: false,

    init: function () {
        this.pTitle           = document.getElementById('pTitle');
        this.pSKU             = document.getElementById('pSKU');
        this.pPrice           = document.getElementById('pPrice');
        this.pDesc            = document.getElementById('pDesc');
        this.pAvailable       = document.querySelector('.checkbox input');
        this.form             = document.getElementById('add-product-form');
        this.inputs           = document.querySelectorAll('#add-product-form input');
        this.addProductButton = document.getElementById('addToCart');
        this.table            = document.querySelector('table');

        this.events();
    },

    events: function () {
        this.addProductButton.addEventListener( 'click', this.addProduct.bind(this) );
        this.form.addEventListener( 'blur', this.checkForm.bind(this), true );
    },

    addProduct: function (event) {
        event.preventDefault();

        this.hasError();
        this.fieldsIsFill();
        this.collectInfo();

        if ( this.flagValidatedData ) {
            this.insertRow();
        } else {
            this.fieldsIsFill();
        }
    },

    showError: function (event) {
        if ( event.target.parentElement.classList.contains('has-error') !== true ) {
            event.target.parentElement.classList.add('has-error');
            event.target.style.background = "#ffeef1";

            this.flagValidatedData = false;
        }
    },

    hideError: function (event) {
        if ( event.target.parentElement.classList.contains('has-error') == true ) {
            event.target.parentElement.classList.remove('has-error');
            event.target.style.background = "#fff";

            this.flagValidatedData = true;
        }
    },

    collectInfo: function () {
        this.valueTitle       = this.pTitle.value;
        this.valueSKU         = this.pSKU.value;
        this.valueDescription = this.pDesc.value;
        this.valuePrice       = this.pPrice.value;

        if ( this.pAvailable.checked ) {
            this.valueAvailable = 'In-stock';
        } else {
            this.valueAvailable = 'Out of stock';
        }
        
        this.numberFormat();
    },

    insertRow: function () {
        var row   = this.table.insertRow(1);
        row.insertCell(0).innerHTML = this.valueSKU;
        row.insertCell(1).innerHTML = this.valueTitle;
        row.insertCell(2).innerHTML = this.valuePrice;
        row.insertCell(3).innerHTML = this.valueDescription;
        row.insertCell(4).innerHTML = this.valueAvailable;
    },

    checkForm: function (event) {
        this.checkQuantitySymbols(event, 1);
        this.checkPrice(event, this.pPrice.value);
    },

    checkPrice: function(event, num) {
        if ( (event.target.value.length) >= 1 && (event.target.id == "pPrice") ) {
            this.isNumeric(event, num);
            this.positiveNumber(event);
        }
    },

    checkQuantitySymbols: function (event, count) {
        if ( (event.target.value.length) <= count && (event.target.dataset.required == "true") ) {
            this.showError(event);

        } else if ( event.target.value.length > count ) {
            this.hideError(event);
        }
    },

    positiveNumber: function (event) {
        if ( event.target.value <= 0 ) {
            this.flagValidatedData = false;
            this.showError(event);
        }
    },

    isNumeric: function (event, num) {
        if (!isNaN(parseFloat(num)) && isFinite(num) ) {
            this.flagValidatedData = true;
            this.hideError(event);
        } else {
            this.flagValidatedData = false;
            this.showError(event);
        }
    },

    numberFormat: function () {
        this.valuePrice = +this.valuePrice;
        if ( this.valuePrice !== 0 ) {
            this.valuePrice = +this.valuePrice.toFixed(2) + '$';
        } else {
            this.valuePrice = '-';
        }
    },

    fieldsIsFill: function(event) {
        for ( var i = 0; i < this.inputs.length; i++ ) {
            if ( this.inputs[i].dataset.required && (this.inputs[i].value.length < 1) ) {
                this.inputs[i].parentElement.classList.add('has-error');
                this.flagValidatedData = false;
            }
        }
    },

    hasError: function () {
        for ( var i = 0; i < this.inputs.length; i++ ) {
            if ( this.inputs[i].parentElement.classList.contains('has-error')  ) {
                this.flagValidatedData = false;
            }
        }
    },
}

productForm.init();