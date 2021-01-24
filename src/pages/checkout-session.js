import React from 'react'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51ID4h4CFr2HaNF8LAl2XJYQtyyWzDz0qxdXmJ9MVhRWvK7o0j7nuu8tV5yfYZAPYm424yYHVA1DaHxMNEfjFBKTu00d3prYB2B")

export default function checkoutSession() {

    const redirectToCheckout = async () => {

        const stripe = await stripePromise;
        const response = await fetch('/.netlify/functions/checkout');
        const data = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: data.id
        })

    }

    return (
        <div>
            <div>Hello Checkout Session</div>
            <button onClick={redirectToCheckout} >Checkout</button>
        </div>
    )
}

 
