var PlaceOrder = (function () {
    function PlaceOrder() {
        var nameGroup = $('#place-name-group');
        var nameInput = $('#place-name');
        var orderGroup = $('#place-order-group');
        var orderInput = $('#place-order');
        var requestGroup = $('#place-special-group');
        var requestInput = $('#place-special');
        var placeBtn = $('#place-btn');
        nameInput.val('');
        orderInput.val('');
        placeBtn.click(function (ev) {
            ev.preventDefault();
            var order = orderInput.val();
            var name = nameInput.val();
            var special = requestInput.val();
            if (!name.length)
                nameGroup.addClass('has-error');
            else
                nameGroup.removeClass('has-error');
            if (!order.length)
                orderGroup.addClass('has-error');
            else
                orderGroup.removeClass('has-error');
            if (!name.length || !order.length) {
                placeBtn.removeClass('btn-default');
                placeBtn.addClass('btn-danger');
            }
            else {
                placeBtn.removeClass('btn-danger');
                placeBtn.addClass('btn-default');
            }
            if (order.length && name.length) {
                $.ajax({
                    url: '/order',
                    method: 'POST',
                    data: {
                        name: name,
                        order: order,
                        special: special
                    },
                    success: function (e) {
                        console.log('successful order');
                        location.href = '/success';
                    }
                });
            }
        });
    }
    return PlaceOrder;
}());
$(document).ready(function () {
    new PlaceOrder();
});
