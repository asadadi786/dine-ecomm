import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripePromise = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;

    if (!stripePromise && key) {
        stripePromise = loadStripe(key)
    }

    return stripePromise;
}

export default getStripePromise;