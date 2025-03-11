import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsInfo from "./ProductDetailsInfo";

const ProductDetails = ({data}) => {
 
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();


  const incrementCount=()=>{
      setCount(count + 1)
  }
  const decrementCount=()=>{
    if(count > 1){
      setCount(count -1)
    }
  }

  const handleMessageSubmit =()=>{
    navigate("/inbox?conversation=563gsfdgweprutoibntwpruhla")
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

  console.log("current data is here :" ,  data)

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[95%] mx-auto`}>   
          <div className="w-full py-5 ">
            <div className="flex flex-col  md:flex-row ">  
              <div className="w-full 800px:pr-4 mb-8 800px:mb-0 block justify-between ">
                <div className="relative h-[400px] w-full">
                  <div className="absolute top-0 left-1/2 transform  -translate-x-1/2 z-10">
                    <img 
                      src={getImageUrl(data.image_Url[select].url)} 
                      alt="Main product" 
                      className="w-[250px] h-[250px] object-contain rounded-lg shadow-md border border-gray-200 bg-white p-2 hover:shadow-lg transition-all duration-300  "
                    />
                  </div>
                  <div 
                    className={`absolute bottom-0 left-[15%] transition-all duration-300 ${select === 0 ? 'scale-110 border-2 border-teal-500' : 'opacity-80 hover:opacity-100'}`}
                    onClick={() => setSelect(0)}
                  >
                    <img 
                      src={getImageUrl(data.image_Url[0].url)} 
                      alt="Product view 1" 
                      className="w-[130px] h-[130px] object-contain rounded-lg shadow-sm cursor-pointer bg-white p-2"
                    />
                  </div>
                  
                  {/* Thumbnail 2 - bottom right of triangle */}
                  <div 
                    className={`absolute bottom-0 right-[15%] transition-all duration-300 ${select === 1 ? 'scale-110 border-2 border-teal-500' : 'opacity-80 hover:opacity-100'}`}
                    onClick={() => setSelect(1)}
                  >
                    <img 
                      src={getImageUrl(data?.image_Url[1].url)} 
                      alt="Product view 2" 
                      className="w-[130px] h-[130px] object-contain rounded-lg shadow-sm cursor-pointer bg-white p-2"
                    />
                  </div>
                </div>
              </div>



              {/* Right side - Product Details Section */}
              <div className="w-full  800px:pl-8 800px:border-l            ">
                <div className="w-full">
                  <h1 className={`${styles.productTitle} text-[24px] font-semibold`}>{data.name}</h1>
                  <p className="mt-3 text-gray-600 text-[15px] leading-6">{data.description}</p>
                  
                  <div className="flex pt-4 items-center">
                    <h4 className={`${styles.productDiscountPrice} text-[22px] font-bold text-teal-600`}>${data.discount_price}</h4>
                    <h3 className={`${styles.price} ml-3 line-through text-gray-400`}>
                      {data.price ? data.price + "$" : null}
                    </h3>
                  </div>
                        
                  <div className="flex items-center mt-6 justify-between ">
                    <div className="flex items-center">
                      <button 
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" 
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button 
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" 
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"   
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-6 w-full">
                    <button className={`${styles.button} w-full rounded-md h-12 flex items-center justify-center bg-teal-600 hover:bg-teal-700 transition-all`}>
                      <span className="text-white flex items-center text-[16px]">
                        Add to Cart <AiOutlineShoppingCart className="ml-2" size={20}/>
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center mt-8 border-t pt-4">
                    <img 
                      src={getImageUrl(data.shop.shop_avatar.url)} 
                      alt="Shop avatar" 
                      className="w-[50px] h-[50px] mr-3 rounded-full border border-gray-200"
                    />
  
                    <div className="pr-4">
                      <h3 className={`${styles.shop_name} pb-1 pt-1 font-medium`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="text-[14px] text-gray-600">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    </div>
                    
                    <button 
                      className={`${styles.button} bg-[#6443d1] hover:bg-[#5636b8] rounded-md h-11 ml-auto px-4 transition-all`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center whitespace-nowrap">
                        Send Message <AiOutlineMessage className="ml-1"/>
                      </span>
                    </button>       
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <ProductDetailsInfo data={data}/>
          <br />
        </div>
      ) : null}
    </div>
    </>
  );
};

export default ProductDetails;
