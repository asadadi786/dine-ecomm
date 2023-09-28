import { NextRequest, NextResponse } from 'next/server'
import { db, cartTable, addToCart } from "@/lib/drizzle"
import { v4 as uuid } from "uuid"
import { cookies } from 'next/headers'
import { and, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs'

// await fetch(`http://localhost:3000/api/cart?user_id=${cookies.get()("user_id")?.value}`)
export async function GET(request: NextRequest) {
    const req = request.nextUrl
    const uid = req.searchParams.get("user_id") as string


    if (!uid) {
        return NextResponse.json({ message: "user id not exist,please set user id first" })
    }
    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, uid))
        //console.log("in GET without slug: " + JSON.stringify(res));
        return NextResponse.json({ res })
    } catch (error) {
        console.log("cart.route.ts = " + error)
        return NextResponse.json({ message: "something went wrong in cart GET method" })
    }
}

export async function POST(request: NextRequest) {
    const req: addToCart = await request.json();
    const { userId } = auth()

    //const userId = "user_2V2biqjfj656B2ItrI6b2ULnIbt";
    // const setCookies = cookies();
    // const user_id = cookies().get("userId")?.value
    // if (!user_id) {
    //     setCookies.set("user_id", userId as string);//this function will save cookies in browser
    //     user_id = "user_2V2biqjfj656B2ItrI6b2ULnIbt";
    // }

    // console.log("req post= " + JSON.stringify(req))
    try {
        if (req && userId) {

            const res = await db.insert(cartTable).values({
                product_id: req.product_id,
                quantity: req.quantity,
                product_title: req.product_title,
                user_id: userId,
                price: req.price,
                total_price: req.price! * req.quantity,
            }).returning();

            //console.log("res post= " + JSON.stringify(res))

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
    const { userId } = auth()
    console.log("userId in PUT=" + userId)
    // const setCookies = cookies();
    // const user_id = cookies().get("userId")?.value
    // if (!user_id) {
    //     setCookies.set("user_id", userId as string);//this function will save cookies in browser
    // }
    try {

        if (data && userId) {
            const res = await db.update(cartTable).set({
                quantity: data.quantity,
                total_price: data.price,
            }).where(and(eq(cartTable.user_id, userId), eq(cartTable.product_id, data.product_id))).returning();

            //.where(eq(cartTable.product_id, data.product_id)).returning();
            //.where(and(eq(cartTable.user_id, data.user_id), eq(cartTable.product_id, data.product_id))).returning();
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

export async function DELETE(request: NextRequest) {

    const Url = request.nextUrl;
    const { userId } = auth()
    console.log("userId in DELETE=" + userId)
    try {

        if (Url.searchParams.has("product_id") && userId) {
            const product_id = Url.searchParams.get("product_id");

            const res = await db.delete(cartTable).where(and(eq(cartTable.user_id, userId),
                eq(cartTable.product_id, product_id as string))).returning()

            return NextResponse.json({ Message: "Product Deleted Successfully from Cart" }, { status: 200 })
        } else {
            if (Url.searchParams.has("product_id")) {
                throw new Error("Login required");
            }
            else {
                throw new Error("Product Id is required")
            }

        }
    } catch (error) {
        return NextResponse.json({ Message: error }, { status: 405 })
    }
}