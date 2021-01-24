import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { graphql, useStaticQuery } from 'gatsby'

const stripePromise = loadStripe("pk_test_51ID4h4CFr2HaNF8LAl2XJYQtyyWzDz0qxdXmJ9MVhRWvK7o0j7nuu8tV5yfYZAPYm424yYHVA1DaHxMNEfjFBKTu00d3prYB2B")

export default function ProductList({location}) {

    const data = useStaticQuery(
        graphql`
            query ProductPrices {
                prices : allStripePrice {
                    edges {
                        node {
                            id
                            active
                            currency
                            unit_amount
                            product {
                                id
                                name
                                images
                            }
                        }
                    }
                }
            }   
        `
    );
    console.log('data', data)

    const redirectToCheckout = async (id) => {
        console.log('id', id)
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems: [{ price: id, quantity: 1 }],
            successUrl: `${location.origin}/payment-success/`,
            cancelUrl: `${location.origin}/payment-error`,
        });
    }

    return (
        <div>
            Product List
            {data.prices.edges.map((node) => {

                return (
                    <div key={node.node.id}>
                        <div>ProductName: {node.node.product.name} </div>
                        <div>ProductPrice: {node.node.unit_amount}{node.node.currency}</div>
                        <div><img alt='img' src={node.node.product.images[0]  } width='200px' /></div>
                        <div><button onClick={()=> {
                            redirectToCheckout(node.node.id)
                        }} >CheckOut</button></div>
                    </div>
                )
            })}
        </div>
    )
}

