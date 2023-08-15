import Order from "../../../Collections/Order"
import connectToDatabase from '../../../db/connection'
import { NextResponse } from 'next/server';


export async function GET(req){
    await connectToDatabase()
let orders=await Order.find()
    return NextResponse.json(orders)
    }
