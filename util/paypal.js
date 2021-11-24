const fetch = require('node-fetch')
const crypto = require('crypto')

var PayPalRoot = 'https://api.sandbox.paypal.com/v1'
if (process.env.banking.paypal.mode === 'live') PayPalRoot = 'https://api.paypal.com/v1'

async function GetAccessToken() {
    var auth = Buffer.from(`${process.env.banking.paypal[process.env.banking.paypal.mode].id}:${process.env.banking.paypal[process.env.banking.paypal.mode].secret}`).toString('base64')

    var response = await fetch(`${PayPalRoot}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
        redirect: 'follow'
    })
        .then(res => res.json())
        .catch(err => console.log(err))

    process.env.banking.paypal.bearer = response.access_token
    setTimeout(GetAccessToken, response.expires_in * 1000 + 1000)

    //CreatePayment()
}

async function CreatePayment() {
    var response = await fetch(`${PayPalRoot}/payments/payment`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.banking.paypal.bearer}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            transactions: [
                {
                    amount: {
                        currency: "AUD",
                        total: "10.00"
                    },
                    description: "This payment is for testing purposes",
                    payment_options: {
                        allowed_payment_method: "IMMEDIATE_PAY"
                    },
                    item_list: {
                        items: [
                            {
                                name: "Test Item",
                                description: "Test Item DESCRIPTION",
                                quantity: "1",
                                price: "10.00",
                                sku: "test01",
                                currency: "AUD"
                            }
                        ]
                    }
                }
            ],
            redirect_urls: {
                return_url: `${process.env.site.root}/paypal/return`,
                cancel_url: `${process.env.site.root}/paypal/cancel`
            }
        })
    })
        .then(res => res.json())
        .catch(err => console.log(err))

    console.log(response)
}



module.exports = {
    GetAccessToken,
    CreatePayment
}