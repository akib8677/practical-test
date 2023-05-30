import React, { useState } from 'react'
import axios from 'axios'

const EditProduct = ({ product, updateProductData }) => {

  const [updateProduct, setUpdateProduct] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category
  })

  const handleChange = (event) => {
    setUpdateProduct({
      ...updateProduct,
      [event.target.name]: event.target.value
    })
  }

  const updateProducts = async (id) => {
    const res = await axios.put(`https://fakestoreapi.com/products/${id}`, updateProduct)
    console.log(res.data)
    updateProductData(res.data)
  }
  return (
    <div className='p-2'>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" value={updateProduct.title} name='title' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="text" className="form-control" value={updateProduct.price} name='price' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input type="text" className="form-control" value={updateProduct.description} name='description' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input type="text" className="form-control" value={updateProduct.category} name='category' onChange={handleChange} />
      </div>
      <button className="btn btn-primary float-end mb-2" onClick={() => updateProducts(updateProduct.id)}>Update</button>
    </div>
  )
}

export default EditProduct