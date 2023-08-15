import connecttodatabase from '../../../db/connection';
import Product from '../../../Collections/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connecttodatabase();
    const datas = await Product.find();

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