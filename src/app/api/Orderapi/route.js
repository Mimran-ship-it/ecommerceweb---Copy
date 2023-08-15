import connectToDatabase from "../../../db/connection";
import Order from "../../../Collections/Order";
import { NextResponse } from 'next/server';

connectToDatabase()

export async function POST(req){
  
    try {
      let body=await req.json() 
      const p = new Order({
        name:body.name ,
        Lastname:body.LastName,
        StreetAdress:body.StreetAdress ,
        Email:body.email ,
        postalCode: body.PostalCode,
        phoneNumber: body.PhoneNumber,
        productName:body.productName,
        price:body.price
        
      });

      const savedOrder = await p.save();
      const generatedId = savedOrder._id;
let order=await Order.findOne({_id:generatedId})
      return NextResponse.json(order);
    } catch (error) {
      console.error("Error saving Order:", error);
      return NextResponse.json({ error: true});
    }
  
}

