import {loadStripe} from '@stripe/stripe-js'

let stripePromise;

const getStripe = () =>{
    if(!stripePromise){
        stripePromise = loadStripe('pk_test_51NZWaJFncAM87BhXoWKqVYU4cceBNKyupMIfHe6GaUEioPlW2BUP4QSrG0t0zxLkWihmiyIbPRc8MjKbtMQ3EHrn00OiKFVlnZ');

    }
    return stripePromise;
}

export default getStripe