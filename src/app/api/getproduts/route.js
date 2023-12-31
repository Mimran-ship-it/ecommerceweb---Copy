import connecttodatabase from '../../../db/connection'
import Product from '../../../Collections/Product'
import { NextResponse } from 'next/server';
export const dynamic='force-dynamic'
connecttodatabase()
export async function GET(){
  
  const data = await Product.find();
    let datareq={}
    data.map((ele)=>{
      let name=ele.name;
      let size=ele.size;  
      let color=ele.color;  
      if(name in datareq){
datareq[name]={
         name: ele.name,
        category: ele.category,
        quantity: ele.quantity,
        price:ele.price,
        slug:ele.slug,
        size:{...datareq[name].size, [size]: [...(datareq[name].size[size] || []), color],},
        desc: ele.desc,
        image:{...datareq[name].image,[color]:ele.image}
}
      }else{
      datareq[name]={
        name: ele.name,
        category: ele.category,
        quantity: ele.quantity,
        slug:ele.slug,
        size:{[size]:[color]},
        price:ele.price,
        desc: ele.desc,
        image:{[color]:ele.image}


      }
      }
    })

    return NextResponse.json({ datareq });
  
}

