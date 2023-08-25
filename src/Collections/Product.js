import mongoose ,{model} from "mongoose";
import chokidar from "chokidar";
const productSchema = new mongoose.Schema({
  name: { type: String, required:true },
  quantity: { type: Number , default: 1 }, 
  slug: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
  price: { type: Number },
  desc: { type: String },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
});
mongoose.models={}
productSchema.index({ name: 1 }, { unique: false }); // Make 'name' index non-unique
productSchema.index({ slug: 1 }, { unique: false }); // Make 'slug' index non-unique
productSchema.index({ quantity: 1 }, { unique: false }); // Make 'slug' index non-unique

let Product = mongoose.model('Product',productSchema);

// Watch the database collection for changes
const watcher = chokidar.watch('products', {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('change', () => {
  const latestProductModel = mongoose.model('Product', productSchema);

  Product = latestProductModel;

 
});


export default Product;