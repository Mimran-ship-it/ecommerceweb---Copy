import Order from "../../../Collections/Order"
import connectToDatabase from '../../../db/connection'
import { NextResponse } from 'next/server';

connectToDatabase()

export async function GET(req){
let orders=await Order.find()
    return NextResponse.json(orders)
    }
