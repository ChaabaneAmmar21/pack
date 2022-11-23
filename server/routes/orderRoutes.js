import  express  from "express"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

import protect from "./../middleware/AuthMidleware.js"

const orderRoutes= express.Router()
//CREATE ORDER
orderRoutes.post(
    "/",
    protect,
    asyncHandler(
        async(req ,res)=>{
           
         const{
            
            orderItems,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
         }=req.body
         if (orderItems && orderItems.length===0) {
            res.status(400)
            throw new Error("No order items")
            
         } else {
            const order=new Order({
                user:req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            const createOrder=await order.save()
            res.status(201).json(createOrder)
         }
           
        }
    )
)
//get order 
orderRoutes.get(
    "/:id",
    protect,
    asyncHandler(
        async(req ,res)=>{
           const order =await Order.findById(req.params.id).populate(
            "user",
            "name email"
           )

         if (order ) {
            res.json(order)
         } else {
         res.status(404)
         throw new Error("order not found")
         }
           
        }
    )
)
//order is paid
orderRoutes.put(
    "/:id/pay",
    protect,
    asyncHandler(
        async(req ,res)=>{
           const order =await Order.findById(req.params.id)
        

         if (order ) {
            order.isPaid=true
            order.paidAt=Data.now
            order.paymentResult={
                id:req.body.id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address:req.body.email_address
            }
            const updateOrder=await order.save()
            req.json(updateOrder)
         } else {
         res.status(404)
         throw new Error("order not found")
         }
           
        }
    )
)
export default orderRoutes