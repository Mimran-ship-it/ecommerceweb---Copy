import connectToDatabase from '../../../db/connection';
import Product from '../../../Collections/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase(); // Connect to the database

    const data = await Product.find();
    let datareq = {};

    data.forEach((ele) => {
      let name = ele.name;
      let size = ele.size;
      let color = ele.color;
      
      if (!datareq[name]) {
        datareq[name] = {
          name: ele.name,
          category: ele.category,
          quantity: ele.quantity,
          price: ele.price,
          slug: ele.slug,
          size: {},
          desc: ele.desc,
          image: {},
        };
      }
      
      if (!datareq[name].size[size]) {
        datareq[name].size[size] = [color];
      } else {
        datareq[name].size[size].push(color);
      }

      if (!datareq[name].image[color]) {
        datareq[name].image[color] = ele.image;
      }
    });

    return NextResponse.json({ datareq });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data.' }, 500);
  }
}
