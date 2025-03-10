// kisi bhi product page m product card pr click krunga toh hamko productdetailspage pr navigate kr dega us product card ki productname k saath show in url

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import { productData } from '../data/Alldata';
import SuggestedProduct from './SuggestedProduct';

const ProductdetailsPage = () => {
  const {name} = useParams();
  const [data , setData] = useState(null);
  const productName = name.replace(/-/g," ");

  console.log(name);

  useEffect(()=>{
    const data = productData.find((i)=> i.name === productName);
    setData(data)
  },[])

  return (
    <div>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data}/>
        }
    </div>
  )
}

export default ProductdetailsPage
