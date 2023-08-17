import connecttodatabase from '../../middleware/connection'
import Product from '../../Collections/Product'

 const handler=async (req, res)=> {
  
    const datas = await Product.find();
    let datareq={}
   
    datas.map((ele) => {
      let name = ele.name;
      if (name in datareq) {
        datareq[name] = {
          name: ele.name,
          category: ele.category,
          quantity: ele.quantity,
          slug: ele.slug,
          
          color: datareq[name].color
            ? [...new Set([...datareq[name].color, ele.color])]
            : [ele.color],
         
          size: datareq[name].size
            ? [...new Set([...datareq[name].size, ele.size])]
            : [ele.size],
            price: ele.price,
          desc: ele.desc,
          image: ele.image,
        };
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

    res.status(200).json({ datareq });
  
}

export default connecttodatabase(handler);
