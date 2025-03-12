// kisi bhi product page m product card pr click krunga toh hamko productdetailspage pr navigate kr dega us product card ki productname k saath show in url

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import { productData } from '../data/Alldata';
import SuggestedProduct from './SuggestedProduct';

const ProductdetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if the name parameter might be an ID
    const possibleId = parseInt(name);
    let foundProduct = null;
    
    // First try to find the product by ID if the name looks like a number
    if (!isNaN(possibleId)) {
      foundProduct = productData.find(product => product.id === possibleId);
    }
    
    // If not found by ID or name isn't a number, try the name-based approach
    if (!foundProduct) {
      const productName = name.replace(/-/g, " ");
      foundProduct = productData.find(product => product.name === productName);
    }
    
    setData(foundProduct);
    setLoading(false);
  }, [name]);

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-2xl font-semibold">Product not found! The product may have been removed or the URL is incorrect.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails data={data} />
      <SuggestedProduct data={data} />
    </div>
  )
}

export default ProductdetailsPage
