
import { cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";


const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async (req: any, res: any) => {
    const headersList = headers();

    try {
        const rawBody = await req.text();
        const sig = headersList.get("stripe-signature")

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2023-08-16"
        })

        let event;

        try {
            if (!sig || !endPointSecret) {
                return new Response("Webhook secret or EndPoint secret missing."), { status: 400 }
            }

            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                sig,
                endPointSecret
            )
        } catch (error) {
            console.log("something wrong with webhook sig")
            return new Response("Webhook signature / endPoint secret missing."), { status: 400 }
        }

        if (`checkout.session.completed` === event.type) {
            const session = event.data.object;

            //@ts-ignore
            const customerData = await stripe.customers.retrieve(session.customer)

            //@ts-ignore
            const userId = customerData.metadata.userId

            await db.delete(cartTable).where(eq(cartTable.user_id, userId));

            //@ts-ignore
            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object!.id)

            return new Response("Payment Confirmation Router Reciept")
        } else {
            res.setHeader("Allow", "POST")
        }
    } catch (error) {
        console.log("Error in webhook---", error);
        return;
    }
}