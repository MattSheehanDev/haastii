
class PlaceOrder {


    constructor() {
				let nameGroup = $('#place-name-group');
        let nameInput = $('#place-name');
				
				let orderGroup = $('#place-order-group');
        let orderInput = $('#place-order');

				let requestGroup = $('#place-special-group');
				let requestInput = $('#place-special');
				
        let placeBtn = $('#place-btn');


				nameInput.val('');
				orderInput.val('');


        placeBtn.click((ev: Event) => {
						ev.preventDefault();
						
            let order = orderInput.val();
            let name = nameInput.val();
						let special = requestInput.val();


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
                    success: (e) => {
												console.log('successful order');
												location.href = '/success';
                    }
                });
            }
        });
    }

}


$(document).ready(() => {

    new PlaceOrder();
});