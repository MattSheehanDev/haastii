var CreateOrder = (function () {
    function CreateOrder() {
        var dropdownBtn = $('#dropdown-btn');
        var dropdownMinutes = $('#dropdown-minutes');
        var dropdownHours = $('#dropdown-hours');
        dropdownMinutes.click(function () { dropdownBtn.html(dropdownMinutes.text() + " <span class=\"caret\"></span>"); });
        dropdownHours.click(function () { dropdownBtn.html(dropdownHours.text() + " <span class=\"caret\"></span>"); });
        var placeGroup = $('#order-place-group');
        var placeInput = $('#order-place');
        var timeGroup = $('#order-time-group');
        var timeInput = $('#order-time');
        var orderBtn = $('#order-btn');
        orderBtn.click(function (ev) {
            ev.preventDefault();
            var place = placeInput.val();
            var time = timeInput.val();
            if (!place.length)
                placeGroup.addClass('has-error');
            else
                placeGroup.removeClass('has-error');
            if (!time.length)
                timeGroup.addClass('has-error');
            else
                timeGroup.removeClass('has-error');
            if (!place.length || !time.length) {
                orderBtn.removeClass('btn-default');
                orderBtn.addClass('btn-danger');
            }
            else {
                orderBtn.removeClass('btn-danger');
                orderBtn.addClass('btn-default');
            }
            if (place.length && time.length) {
                // submit to server
                $.ajax({
                    url: '/create',
                    method: "POST",
                    data: {
                        place: place,
                        time: time,
                        units: dropdownBtn.text()
                    },
                    success: function () {
                        console.log('successful new order');
                        location.href = '/';
                    }
                });
            }
        });
    }
    return CreateOrder;
}());
$(document).ready(function () {
    new CreateOrder();
});
