// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async (event) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Bag',
          images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdmvDIh6mB2EPLL--2ZVupwxHqSePVxGt8Q&usqp=CAU']
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },],
    mode: 'payment',
    success_url: 'http://localhost:8888/payment-success/',
    cancel_url: 'http://localhost:8888/payment-error/',
  });

  try {

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
