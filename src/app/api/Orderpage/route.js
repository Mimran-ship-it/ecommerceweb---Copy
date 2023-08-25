import Order from "../../../Collections/Order"
import connectToDatabase from '../../../db/connection'
import { NextResponse } from 'next/server';
export const dynamic='force-dynamic'
connectToDatabase()

export async function GET(req){
let orders=await Order.find()
    return NextResponse.json(orders)
    }
