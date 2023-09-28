import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2023-08-16"
});

export async function POST(request: NextRequest) {
    const { userId } = auth()
    const body = await request.json();
    //console.log("body=" + body)

    const customer = await stripe.customers.create({
        metadata: {
            userId: userId
        },
    })

    try {
        if (body.length > 0 && userId) {
            //console.log(body)

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                //     line_items: [
                //         {
                //             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                //             price: '{{PRICE_ID}}',
                //             quantity: 1,
                //         },
                //     ],
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: "shr_1NXrZELmQeF9Al3ch5EQ1V1q" },
                    { shipping_rate: "shr_1NXrYNLmQeF9Al3cAKZBNywW" }
                ],
                invoice_creation: {
                    enabled: true,
                },

                line_items: body.map((item: any) => {
                    return {
                        price_data: {
                            currency: "pkr",
                            product_data: {
                                name: item.title,
                                // images:{item.image}
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                        },
                    };
                }),
                phone_number_collection: {
                    enabled: true,
                },
                customer: customer.id,

                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });
            return NextResponse.json({ session })
        }
        else {
            return NextResponse.json({ message: "Product data is missing or no user logged in" });
        }

    } catch (err: any) {
        console.log(err)
        return NextResponse.json("stripe session error= " + err.message);
    }
}