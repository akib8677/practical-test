import { useEffect, useState, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri"
import Model from '../sheard/Model';
import EditProduct from './Edit/Edit';
import ViewProduct from './View/View';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'

const Product = () => {
  const [products, setProducts] = useState([])
  const [modalDetail, setModalDetail] = useState();
  const [query, setQuery] = useState("");
  const [filetr, setFiletr] = useState("all");
  const category = [];

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    setProducts(data)
  }


  products.map((e) => {
    if (!category.includes(e.category)) category.push(e.category);
  });



  const columns = [
    {
      name: 'Title',
      width: "400px",
      selector: row => row.title,
    },
    {
      name: 'Price',
      width: "200px",
      selector: row => row.price,
    },
    {
      name: 'Description',
      width: "800px",
      selector: row => row.description,
    },
    {
      name: 'Category',
      width: "250px",
      selector: row => row.category,
    },
    {
      name: 'Action',
      sortable: true,
      selector: row => {
        return (
          <div className='btn-section'>
            <button className='btn' onClick={() => viewProduct(row)}><GrView size={25} color='green' /></button>
            <button className='btn' onClick={() => editProduct(row)}><BiEdit size={25} color='blue' /></button>
            <button className='btn' onClick={() => deleteProduct(row.id)}><RiDeleteBin6Line size={25} color='red' /></button>
          </div>
        )
      },
    },
  ];

  const updateProductData = (updProduct) => {
    const filterProducts = products.filter(p => p.id !== updProduct.id)
    filterProducts.push(updProduct)
    setProducts(filterProducts.sort(function (a, b) {
      return a.id - b.id
    }))
    setModalDetail(false)
  }

  const viewProduct = (product) => {
    setModalDetail({ show: true, title: "Product Detail", component: <ViewProduct product={product} /> })
  }

  const editProduct = (product) => {
    setModalDetail({ show: true, title: "Update Product", component: <EditProduct product={product} updateProductData={updateProductData} /> })
  }

  const deleteProduct = async (id) => {
    const res = await axios.delete(`https://fakestoreapi.com/products/${id}`)
    console.log(res.data)
    const filterProducts = products.filter(p => p.id !== res.data.id)
    setProducts(filterProducts)
  }

  const closeModel = () => {
    setModalDetail({})
    setModalDetail(false)
  }


  const keys = ["title", "category", "description"];
  const search = (data, searchterm) => {
    if (searchterm == null) return data
    return data.filter((item) =>
      keys.some((key) =>
        item[key].toLowerCase().includes(searchterm?.toLowerCase())
      )
    );
  };

  const categoryUpdate = (data, c) => {
    if (c === null) {
      return data;
    } else {
      return data.filter((d) => d.category === c);
    }
  };

  const hanldeChange = (e) => {
    if (e.target.value.length !== null) {
      if (e.target.value === "all") {
        setFiletr('all')
      } else {
        setFiletr(e.target.value)
      }
    }
  };

  const bindData = () => {
    if (filetr === 'all') {
      return search(products, query)
    } else {
      return categoryUpdate(products, filetr)
    }
  }

  return (
    <>
      <div className='container d-flex justify-content-between my-2'>
        <div className='d-flex'>
          <div>
            <label htmlFor="category" className='fs-5'>Choose a Category:</label>
          </div>
          <div className='mx-2 '>
            <select className="form-select" defaultValue={'All'} onChange={(e) => hanldeChange(e)}>
              <option value="all">All</option>
              {category.map((e, key) => {
                return (
                  <option key={key} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='searchBar'>
          <div className="search-container">
            <input type="text" placeholder="Search.." name="search" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
            <button onClick={(e) => setQuery(e.target.value?.toLowerCase())}><AiOutlineSearch /></button>
          </div>
        </div>
      </div>
      <hr />
      {products && <DataTable
        columns={columns}
        data={bindData()}
      />}

      <Model modalDetail={modalDetail} closeModel={closeModel} />
    </>
  )
}

export default Product