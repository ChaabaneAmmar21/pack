import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

// ALL PRODUCT
export const productListReducer = (state = { prds:[] }, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, prds: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, prds: payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
// DELETE PRODUCT
export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, prds: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
// CREATE PRODUCT
export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// EDIT PRODUCT
export const productEditeReducer = (state = { prds: { reviews: [] } }, { type, payload }) => {
  switch (type) {
    case PRODUCT_EDIT_REQUEST:
      return { loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_EDIT_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
// UPDATE PRODUCT
export const productUpdateReducer = (state = { prds: { product: {} } }, { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return { product:{} };

    default:
      return state;
  }
};
