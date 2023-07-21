import { NextRequest, NextResponse } from 'next/server'
import { db, cartTable } from "@/lib/drizzle"
import { v4 as uuid } from "uuid"
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'

// await fetch(`http://localhost:3000/api/cart?user_id=${cookies.get()("user_id")?.value}`)
export async function GET(request: NextRequest) {
    const req = request.nextUrl
    const uid = req.searchParams.get("user_id") as string

    if (!uid) {
        return NextResponse.json({ message: "user id not exist,please set user id first" })
    }
    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, uid))
        return NextResponse.json({ res })
    } catch (error) {
        console.log("")
        return NextResponse.json({ message: "something went wrong in cart GET method" })
    }
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id")?.value
    if (!user_id) {
        setCookies.set("user_id", uid);//this function will save cookies in browser
    }
    try {
        const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: 1,
            user_id: user_id as string
        }).returning();

        return NextResponse.json({ res })
    } catch (error) {
        console.log("")
        return NextResponse.json({ message: "something went wrong in cart GET method" })
    }
}