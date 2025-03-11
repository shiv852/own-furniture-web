import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../styles/styles';
import {   
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
const ProductDetailsCard = ({setOpen , data}) => {

  const [count , setCount] = useState(1)
  const [click , setClick] = useState(false)
  const [select , setSelect] = useState(false)

  const handleMessageSubmit=()=>{}

  const decrementCount =()=>{ 
    if (count > 1) {
    setCount(count - 1);
  }}
  const incrementCount =()=>{
     setCount(count + 1);
  }

  // Helper function to handle image URLs
  const getImageUrl = (path) => {
    if (!path) return '';
    
    // If it's already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Otherwise, prepend a slash for relative paths
    return `/${path}`;
  };

  return (
    <div className='bg-black'>
      {
        data ? (
          <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
            <div className='w-[90%] 800px:w-[70%] h-[85vh] overflow-y-scroll 800px:h-[70vh] bg-white rounded-md shadow-sm relative p-4'>

            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="w-full md:flex">
               <div className='w-full 800px:w-[45%] flex flex-col items-center'>
                    <div className="w-full flex justify-center items-center">
                      <img 
                        src={getImageUrl(data.image_Url[0].url)} 
                        alt="Product image" 
                        className='rounded-lg mt-4 w-[80%] h-auto max-h-[250px] object-contain' 
                      />
                    </div>
                    <div className="flex mt-4 w-full pl-4">
                      <img 
                        src={getImageUrl(data.shop.shop_avatar.url)} 
                        alt="Shop avatar" 
                        className='w-[40px] h-[40px] rounded-full mr-2'
                      />
                      <div>
                            <h3 className={`${styles.shop_name}`}>
                                {data.shop.name}
                            </h3>
                            <h5 className='text-[13px] text-gray-500'>
                              ({data.shop.ratings}) Ratings
                            </h5>
                      </div>
                    </div>
                    <div className="w-full pl-4 mt-2">
                      <div className={`${styles.button} bg-[#000] mt-2 rounded-[4px] h-10 w-[90%]`} onClick={handleMessageSubmit}>
                        <span className='text-[#fff] flex items-center justify-center text-[14px]'>
                          Send Message <AiOutlineMessage className="ml-1" />   
                        </span>
                      </div> 
                      <h5 className='text-[14px] mt-2 text-pink-400'>
                        ({data.total_sell}) Sold out
                      </h5>
                    </div>
                </div>
                    {/* right part */}

              <div className="w-full 800px:w-[55%] pt-3 pl-[15px] pr-[15px] ">
                    <h1 className={`${styles.productTitle} text-[18px]`}>
                      {data.name}
                    </h1>
                    <p className="mt-1 text-[14px] leading-5 text-gray-600 max-h-[120px] overflow-y-auto pr-2">
                      {data.description}
                    </p>
                      <div className="flex pt-2 items-center">
                          <h4 className={`${styles.productDiscountPrice} mr-3 text-[16px]`}>
                            ${data.discount_price}
                          </h4>
                          <h3 className={`${styles.price} line-through text-gray-400 text-[14px]`}>
                            {data.price ? data.price + "$" : null}
                          </h3>
                      </div>
                       <div className="flex items-center mt-4 justify-between">
                         <div className='flex items-center'>
                              <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-3 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={decrementCount}>
                                -
                              </button>
                             <span className="bg-gray-200 text-gray-800 font-medium px-3 py-[6px]">
                               {count}
                             </span>
                              <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-3 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={incrementCount}>
                               +
                              </button>
                          </div>

                        <div>
                          {click ?(
                            <AiFillHeart
                            size={25}
                            className="cursor-pointer"
                            onClick={()=>setClick(!click)}
                            color={click ? "red" :"#333"}
                            title="remove from wishlist"
                            />
                           ):(
                            <AiOutlineHeart 
                            size={25}
                            className="cursor-pointer"
                            onClick={()=>setClick(!click)}
                            color={click ? "red" : "#333"}
                            title="Add to wishlist"   
                            />
                           )}
                        </div>
                       
                        </div>
                        <div className={`${styles.button} mt-4 rounded-[4px] h-10 flex items-center justify-center`}>
                          <span className="text-[#fff] flex items-center text-[14px]">
                            Add to cart <AiOutlineShoppingCart className="ml-1" />
                          </span>
                        </div>
              </div>     
            </div>
            </div>
          </div>
        ):null
      }
    </div>
  )
}
export default ProductDetailsCard
