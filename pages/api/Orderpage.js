import Order from "../../Collections/Order"
import connectToDatabase from '../../middleware/connection'
const handler=async (req, res)=> {
let orders=await Order.find()
    res.status(200).json(orders)
    }
export default  connectToDatabase(handler)