import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'

export default configureStore({
    reducer: {
        selectedProducts: productReducer
    }
})