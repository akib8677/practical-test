import React from 'react'

const ViewProduct = ({ product }) => {
  return (
    <>
      <div className='p-3'>
            <div className='d-flex'>
              <div className='fw-medium fs-4'>Title:</div>
              <div className='mx-2 mt-2 fst-normal'>{product?.title}</div>
            </div>
            <hr/>
            <div className='d-flex'>
              <div className='fw-medium fs-4'>price:</div>
              <div className='mx-2 mt-2 fst-normal'>{product?.price}</div>
            </div>
            <hr/>
            <div className='d-flex'>
              <div className='fw-medium fs-4'>Description:</div>
              <div className='mx-2 mt-2 fst-normal'>{product?.description}</div>
            </div>
            <hr/>
            <div className='d-flex'>
              <div className='fw-medium fs-4'>Category:</div>
              <div className='mx-2 mt-2 fst-normal'>{product?.category}</div>
            </div>
          </div>
    </>
  )
}

export default ViewProduct