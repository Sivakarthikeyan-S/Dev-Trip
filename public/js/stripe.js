/* eslint-disable */
import axios from "axios";
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51KvisESIeRShv6kr6zsTkzXQprKeFp340fIf2XRDPPKiU9kmJOb0ekgjZDvC3VtWfScsmYGNr0PYLEALVkQahjEN00XjvSuRj6');

export const bookTour = async tourId => {
    try{
        //1) Get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);

        //2) Create checkout form + chanre credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch(err) {
        console.log(err);
        showAlert('error', err);
    }
}