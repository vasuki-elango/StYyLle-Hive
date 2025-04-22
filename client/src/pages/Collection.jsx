import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import axios from 'axios'

export const Collection = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([]);
  const [Subcategory, SetsubCategory] = useState([]);
  const [selectcat, setselectCat] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/`).then((res) => {
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    })

    const categorySet = new Set(products.map((item) => item.category));
    setCategory([...categorySet])

    const subcategorySet = new Set(products.map((item) => item.subCategory));
    SetsubCategory([...subcategorySet])

  }, [products])

  useEffect(() => {
    if (selectcat.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item =>
        selectcat.includes(item.category) || selectcat.includes(item.subCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [selectcat, products]);

  const handleChange = (e) => {
    const data = e.target.value
    setselectCat(prev => prev.includes(data) ? prev.filter(cat => cat !== data) : [...prev, data])
  }

  return (
    <section className='container flex gap-5 mt-3 p-3'>
      {/* Filter */}
      <div className='border h-screen p-4 lg:inline hidden'>
        {/* Category */}
        <div className='mb-4 w-32'>
          {
            category.map((cat, key) => {
              return <label className='text-sm block' key={key} >
                <input type="checkbox" value={cat} checked={selectcat.includes(cat)} onChange={handleChange} /> {cat}
              </label>
            })
          }
        </div>

        {/* SubCategory */}
        <div>
          {
            Subcategory.map((cat, key) => {
              return <label key={key} className='block'>
                <input type="checkbox" value={cat} checked={selectcat.includes(cat)} onChange={handleChange} /> {cat}
              </label>
            })
          }
        </div>
      </div>

      {/* products */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 gap-y-8">
          {
            FilteredProducts.map((item, key) => <ProductCard key={key} item={item} />)
          }
        </div>
      </div>
    </section>
  )
}
