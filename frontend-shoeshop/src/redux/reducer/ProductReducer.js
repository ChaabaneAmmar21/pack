import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const productListReducer= (state = {products:[]}, { type, payload }) => {
  switch (type) {

  case PRODUCT_LIST_REQUEST:
    return { loading:true, product:[] }
   case PRODUCT_LIST_SUCCESS:
       console.log(payload)
        return { loading:false, products:payload }

        case PRODUCT_LIST_FAILED:
            return { loading:false, error:payload }
  default:
    return state
  }
}
//single product
export const productDetailReducer= (state = {product:{reviews:[]}}, { type, payload }) => {
  switch (type) {

  case PRODUCT_DETAILS_REQUEST:
    return { ...state, loading:true}
   case PRODUCT_DETAILS_SUCCESS:
      
        return { loading:false, product:payload }

        case PRODUCT_DETAILS_FAILED:
            return { loading:false, error:payload }
  default:
    return state
  }
}
