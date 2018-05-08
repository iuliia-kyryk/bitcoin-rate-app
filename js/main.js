$(document).ready(function () {

    var priceBuy = $('#buy-price');
    var priceSell = $('#sell-price');
    var buyArrow = $('#buy-arrow');
    var sellArrow = $('#sell-arrow');

    function getExchange() {
        var currentBuyPrice = parseFloat(priceBuy.html());
        var currentSellPrice = parseFloat(priceSell.html());

        $.getJSON('https://blockchain.info/pl/ticker', function (price) {
            priceBuy.html(price.PLN.buy.toFixed(2));
            priceSell.html(price.PLN.sell.toFixed(2));

            if (currentBuyPrice < parseFloat(price.PLN.buy)) {
                buyArrow.css('color', 'green').removeClass().addClass('fa fa-arrow-up');
            } else if (currentBuyPrice > parseFloat(price.PLN.buy)) {
                buyArrow.css('color', 'red').removeClass().addClass('fa fa-arrow-down');
            } else {
                buyArrow.css('color', 'black').removeClass().addClass('fa fa-minus-square-o');
            }

            if (currentSellPrice < parseFloat(price.PLN.sell)) {
                sellArrow.css('color', 'green').removeClass().addClass('fa fa-arrow-up');
            } else if (currentSellPrice > parseFloat(price.PLN.sell)) {
                sellArrow.css('color', 'red').removeClass().addClass('fa fa-arrow-down');
            } else {
                sellArrow.css('color', 'black').removeClass().addClass('fa fa-minus-square-o');
            }
        });
    }

    getExchange();
    var interval = setInterval(getExchange, 5000);

    $('.btn').click(function () {
        clearInterval(interval);
        interval = setInterval(getExchange, $(this).val());
        $(this).addClass('active-btn');
        $(this).siblings().removeClass('active-btn');
    })

});