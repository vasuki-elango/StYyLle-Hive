import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const EditProduct = () => {
    const { id } = useParams()
    const admintoken = localStorage.getItem('admintoken')
    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        bestseller: false,
        price: "",
        stock: "",
        sizes: "",
        image:[]
    })
    const [imagePreview,setImagePreview] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`)
        .then((res) =>{ 
            setProduct(res.data)
            setImagePreview(res.data.image)
        })
    }, [id])

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProduct((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleFileChange = (e) =>{
        const file = Array.from(e.target.files)
        setProduct(prev=>({...prev,image:file}))

        const Preview = file.map((img)=>URL.createObjectURL(img))
        setImagePreview(Preview)
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();        
        const formData = new FormData();
        
        for(let key in product){
            if(key==="image"){
                product.image.forEach(img=>formData.append("images",img))
            }
            else{
                formData.append(key,product[key])
            }
        }

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/product/edit/${product._id}`,
            formData,{
            headers:{
              Authorization:`Bearer ${admintoken}`
            }
        }).then(res=>{
            toast.success(res.data.message,{
                autoClose:500
            })
        })
        
        setProduct({
            name: "",
            description: "",
            category: "",
            subCategory: "",
            bestseller: false,
            price: "",
            stock: "",
            sizes: "",
            image:[]
        })
    }

    return (
        <div className='container'>
            <h2 className='text-2xl m-3 text-center'>AddProduct</h2>
            <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white shadow rounded space-y-4">
                {/* Row 1: Name + Price */}
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="block mb-1">Product Name</label>
                        <input name="name" onChange={handleChange} className="w-full border p-2 rounded" required value={product.name}/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-1">Price</label>
                        <input type="number" name="price" onChange={handleChange} className="w-full border p-2 rounded" required value={product.price}/>
                    </div>
                </div>

                {/* Row 2: Category + Subcategory */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-1">Category</label>
                        <input name="category" onChange={handleChange} className="w-full border p-2 rounded" required value={product.category} />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-1">Subcategory</label>
                        <input name="subCategory" onChange={handleChange} className="w-full border p-2 rounded" value={product.subCategory}/>
                    </div>
                </div>

                {/* Row 3: Stock + Sizes */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-1">Stock</label>
                        <input type="number" name="stock" onChange={handleChange} className="w-full border p-2 rounded" required value={product.stock} />
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-1">Sizes (comma-separated)</label>
                        <input name="sizes" onChange={handleChange} className="w-full border p-2 rounded" value={product.sizes}/>
                    </div>
                </div>

                {/* Row 4: Description */}
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea name="description" onChange={handleChange} className="w-full border p-2 rounded" rows="3" value={product.description}/>
                </div>

                {/* Row 5: Bestseller */}
                <div>
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="bestseller" onChange={handleChange} value={product.bestseller} checked={product.bestseller} />Bestseller
                    </label>
                </div>

                {/* Row 6: Image Upload */}
                <div>
                    <label className="block mb-1">Upload Image</label>
                    <input type="file" accept="image/*" multiple className="w-full border p-2 rounded" onChange={handleFileChange}/>
                </div>

                {/* Row 7: Image Preview */}
                {imagePreview.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4">
                        {imagePreview.map((src, idx) => (
                            <img key={idx} src={src} alt={`Preview ${idx}`} className="w-32 h-32 object-cover border rounded m-2" />
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg">
                    Add Product
                </button>
            </form>
        </div>
    )
}
