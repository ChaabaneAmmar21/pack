import  express  from "express"
import asyncHandler from "express-async-handler"
import Product from "./../models/productModel.js";
import protect from "./../middleware/AuthMidleware.js"
//getAll
const productsRoutes= express.Router()
productsRoutes.get(
    "/",
    asyncHandler(
        async(req ,res)=>{
            const pageSize=6
            const page=Number(req.query.pagenumber)||1
            const keyword=req.query.keyword?{
                name:{
                    $regex:req.query.keyword,
                    $options:"i"
                }
            }:{}
            const count=await Product.countDocuments({...keyword});
            const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1)).sort({id:-1});

            res.json({products,page, pages:Math.ceil(count/pageSize)})
        }
    )
)
//getById
productsRoutes.get(
    "/:id",
    asyncHandler(async(req,res)=>{
        const product=await Product.findById(req.params.id)
        if (product) {
            res.json(product)
            
        } else {
            res.status(404)
            throw new Error("Product not found")
            
        }
        }
    )
)
//product review
productsRoutes.post(
    "/:id/review",
    protect,
    asyncHandler(async(req,res)=>{
        const{rating,comment}=req.body
        const product=await Product.findById(req.params.id)
        if (product) {
        console.log(product)
          const alreadyReviewed=product.review.find(
            (r)=>r.user._id.toString()===req.user._id.toString()
          )
        if (alreadyReviewed!=undefined) {

            res.status(400)
            throw new Error("Product already reviewed")
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.review.push(review)
        product.numReviews=product.review.length
        product.rating=
        product.review.reduce((acc,item)=>item.rating=acc,0)/product.review.length
        await product.save()
        res.status(201).json({message:"reviewed added"})
            
        } else {
            res.status(404)
            throw new Error("Product not found")
            
        }
        }
    )
)
export default productsRoutes
