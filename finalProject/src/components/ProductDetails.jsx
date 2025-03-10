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

  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
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
        <div className={`${styles.section} w-[90%]  800px:w-[80%] `}>   
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">  
              <div className="w-full 800px:w-[50%]">
              <img 
                src={getImageUrl(data.image_Url[select].url)} 
                alt="Product image" 
                className="w-[80% ]"
              />
              </div>
              <div className="w-full md:flex  800px:w-[50%]">
              {/* bg-red-600  */}
                <div className="w-full  flex">
                  <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>  
                  
                    <img 
                      src={getImageUrl(data.image_Url[0].url)} 
                      alt="Product thumbnail" 
                      onClick={()=>setSelect(0)} 
                    />

                  </div>
                  <img 
                    src={getImageUrl(data?.image_Url[1].url)} 
                    alt="Product thumbnail" 
                    onClick={()=>setSelect(1)} 
                    className="h-[200px] w-[100px] rounded-lg mt-8"
                  />
              </div>
              {/* g-green-400 */}
                      <div className="w-full    800px:w-[50%]">
                        <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                        <p>{data.description}</p>
                        <div className="flex pt">
                          <h4 className={`${styles.productDiscountPrice}`}>${data.discount_price}</h4>
                          <h3 className={`${styles.price}`}>
                              {data.price ? data.price + "$" : null}
                          </h3>
                        </div>
                       


                        <div className="flex items-center mt-12 justify-between ">
                         <div className='' >
                              <button className='  bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={decrementCount}>
                                -
                              </button>
                             <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                               {count}
                             </span>
                              <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={incrementCount}>
                               +
                               </button>
                          </div>


                        <div>
                          {click ?(
                            <AiFillHeart
                            size={30}
                            className="cursor-pointer"
                            onClick={()=>setClick(!click)}
                            color={click ? "red" :"#333"}
                            title="remove from wishlist"
                            />
                           ):(
                            <AiOutlineHeart
                            size={30}
                            className="cursor-pointer "
                            onClick={()=>setClick(!click)}
                            color={click ? "red" : "#333"}
                            title="Add to wishlist"   
                            />
                           )}
                        </div>
                       
                        </div>
                  <div className={` ${styles.button} mt-6 rounded h-11 flex items-center`}>
                        <span className="text-white flex items-center">
                          Add to Cart <AiOutlineShoppingCart/>
                        </span>
                  </div>

                  <div className="flex items-center pt-8">
                    <img 
                      src={getImageUrl(data.shop.shop_avatar.url)} 
                      alt="Shop avatar" 
                      className="w-[50px] h-[50px] mr-2 rounded-full"
                    />
 
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                        <h5 className="pb-3 text-[15px] text-black ">
                          ({data.shop.ratings}) Ratings
                        </h5>
                    </div>
                      <div className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}
                      onClick={handleMessageSubmit}
                      >
                           <span className="text-white flex items-center">
                            Send Message <AiOutlineMessage className="ml-1"/>
                           </span>
                      </div>       
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
