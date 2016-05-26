
class CreateOrder {


    constructor() {
        let dropdownBtn = $('#dropdown-btn');
        let dropdownMinutes = $('#dropdown-minutes');
        let dropdownHours = $('#dropdown-hours');

        dropdownMinutes.click(() => { dropdownBtn.html(`${dropdownMinutes.text()} <span class="caret"></span>`); });
        dropdownHours.click(() => { dropdownBtn.html(`${dropdownHours.text()} <span class="caret"></span>`); });


				let placeGroup = $('#order-place-group');
        let placeInput = $('#order-place');

				let timeGroup = $('#order-time-group');
        let timeInput = $('#order-time');
				
        let orderBtn = $('#order-btn');

				
        orderBtn.click((ev: Event) => {
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
                    success: () => {
												console.log('successful new order');
												location.href = '/';
                    }
                });
            }
        });
    }

}



$(document).ready(() => {

    new CreateOrder();
});