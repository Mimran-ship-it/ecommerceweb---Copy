import connecttodatabase from '../../../db/connection';
import Product from '../../../Collections/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connecttodatabase();
    
    async function retryQueryWithTimeout(queryFunction, maxRetries, retryDelay) {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          return await queryFunction();
        } catch (error) {
          console.error('Query error, retrying...', error);
          retries++;
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
      throw new Error('Max retries exceeded.');
    }
    
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    
    const datas = await retryQueryWithTimeout(Product.find.bind(Product), maxRetries, retryDelay);
    


    const datareq = {};

    datas.forEach((ele) => {
      const name = ele.name;

      if (name in datareq) {
        datareq[name].color.push(ele.color);
        datareq[name].size.push(ele.size);
      } else {
        datareq[name] = {
          name: ele.name,
          category: ele.category,
          quantity: ele.quantity,
          slug: ele.slug,
          color: [ele.color],
          size: [ele.size],
          price: ele.price,
          desc: ele.desc,
          image: ele.image,
        };
      }
    });

    return NextResponse.json({ datareq });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error('An error occurred.');
  }
}