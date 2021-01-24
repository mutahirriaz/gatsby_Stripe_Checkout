import React from "react"
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51ID4h4CFr2HaNF8LAl2XJYQtyyWzDz0qxdXmJ9MVhRWvK7o0j7nuu8tV5yfYZAPYm424yYHVA1DaHxMNEfjFBKTu00d3prYB2B")

export default function Home({location}) {

  

  const redirectToCheckout = async () => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{price: 'price_1ID58SCFr2HaNF8LEY8n1gFd', quantity: 3},
      {price: 'price_1ID5pCCFr2HaNF8LZdXUZzQR', quantity: 1}
       ],
      successUrl: `${location.origin}/payment-success/`,
      cancelUrl: `${location.origin}/payment-error`,
    });
  }

  return(
      <div>
        <h1>Hello World</h1>
        <button onClick={redirectToCheckout} >Checkout</button>
      </div>
  )
}
