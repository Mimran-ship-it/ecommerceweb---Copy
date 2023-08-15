import Order from "../../../Collections/Order"
import connectToDatabase from '../../../db/connection'
import { NextResponse } from 'next/server';


export async function GET(req){
   try{ await connectToDatabase()
let orders=await Order.find()
    return NextResponse.json(orders)}
    catch(error){
        return NextResponse.json({ error: 'An error occurred while fetching data.' }, 200);
    }
    }
