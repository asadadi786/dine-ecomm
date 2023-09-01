import { NextRequest, NextResponse } from 'next/server'
import { db, cartTable, addToCart } from "@/lib/drizzle"
import { v4 as uuid } from "uuid"
import { cookies } from 'next/headers'
import { and, eq } from 'drizzle-orm'

// await fetch(`http://localhost:3000/api/cart?user_id=${cookies.get()("user_id")?.value}`)
export async function GET(request: NextRequest) {
    const req = request.nextUrl
    const uid = req.searchParams.get("user_id") as string


    if (!uid) {
        return NextResponse.json({ message: "user id not exist,please set user id first" })
    }
    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, uid))
        console.log("in GET without slug: " + JSON.stringify(res));
        return NextResponse.json({ res })
    } catch (error) {
        console.log("cart.route.ts = " + error)
        return NextResponse.json({ message: "something went wrong in cart GET method" })
    }
}

export async function POST(request: NextRequest) {
    const req: addToCart = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id")?.value
    if (!user_id) {
        setCookies.set("user_id", uid);//this function will save cookies in browser
    }
    console.log("userId= " + user_id)
    console.log("req post= " + JSON.stringify(req))
    try {
        if (req) {

            const res = await db.insert(cartTable).values({
                product_id: req.product_id,
                quantity: req.quantity,
                user_id: user_id as string,
                price: req.price,
                total_price: req.price! * req.quantity,
            }).returning();

            console.log("res post= " + JSON.stringify(res))

            return NextResponse.json({ Message: "Data added successfully" }, { status: 200 })
        }
        else {
            throw new Error("Failed to add data to db")
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "something went wrong in cart POST method" }, { status: 400 })
    }
}

export async function PUT(request: NextRequest) {

    const data: addToCart = await request.json();
    console.log("data =" + data.product_id + " quantity= " + data.quantity)

    const uid = uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id")?.value
    if (!user_id) {
        setCookies.set("user_id", uid);//this function will save cookies in browser
    }
    try {

        if (data) {
            const res = await db.update(cartTable).set({
                quantity: data.quantity,
                total_price: data.price,
            }).where(eq(cartTable.product_id, data.product_id)).returning();
            //where(and(eq(cartTable.user_id, data.user_id), eq(cartTable.product_id, data.product_id))).returning();
            //
            return NextResponse.json({ Message: "Data Updated Successfully" }, { status: 200 })
        }
        else {
            throw new Error("Failed to update data")
        }
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ Message: error }, { status: 500 })
    }

}