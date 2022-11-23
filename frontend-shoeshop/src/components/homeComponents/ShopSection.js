import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";

import {useDispatch, useSelector}from "react-redux"
import { listProduct } from "../../redux/action/ProductAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const ShopSection = () => {
  const dispatch = useDispatch()
  const productlist=useSelector((state)=>state.listproduct)
  const {error,loading,products}=productlist
  console.log(products)
  useEffect(() => {
 dispatch(listProduct())
  }, [dispatch])
  
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading?(
                  <div className="mb-5">
                <Loading/>
                </div>
                ):error?(
                  <Message variant="alert-danger">{error}</Message>
                ):(<>
                {products.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>

                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <h3>${product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))}</>)}
                
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
