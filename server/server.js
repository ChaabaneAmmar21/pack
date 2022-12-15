import express from "express"
import dotenv from "dotenv"
import { connectdb } from "./config/connectdb.js"
import  importdata  from "./dataimport.js"
import productsRoutes from "./routes/productsRoutes.js"
import { errorHandler, notFound } from "./middleware/Error.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
dotenv.config()
connectdb()
const app =express()
app.use(express.json())
// app.use("/uploads",express.static(""))
//API
app.use("/api/import",importdata)
app.use("/product",productsRoutes)
app.use("/user",userRoutes)
app.use("/order",orderRoutes)

//errorhandler
app.use(notFound)
app.use(errorHandler)

const port=process.env.port || 1000
app.listen(port ,console.log(`is running in ${port}`))