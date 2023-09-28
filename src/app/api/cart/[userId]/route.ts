import { category } from './../../../../../sanity/category';
import { Cart, cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params: { userId } }: { params: { userId: string } }) => {
    try {
        if (!userId) {

            throw new Error("User Id does not exits")
        } else {
            const res: Cart[] = await db
                .select()
                .from(cartTable)
                .where(eq(cartTable.user_id, userId));

            // console.log("cart db select res in GET: " + JSON.stringify(res));

            const cartItems = res.map((item) => ({
                _id: item.product_id,
                title: item.product_title,
                price: item.price,
                totalPrice: item.price * item.quantity,
                userId: item.user_id,
                quantity: item.quantity,
            }));


            // console.log("cartItems set to in GET: " + JSON.stringify(cartItems))
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

            const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
            //const cartItemId = cartItems[0]._id
            // console.log("cartItems id: " + cartItemId)
            return NextResponse.json({ cartItems, totalQuantity, totalPrice }, { status: 200 });
        }
    } catch (error) {
        console.log("error in cart->userId= " + error)
        return NextResponse.json({ error }, { status: 505 })
    }
}