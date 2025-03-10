import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from "react-icons/bs";


const WishlistSingle = ({data}) => {
  const [value , setValue] = useState(1);
      const totalPrice = data.price*value;

  return (
    <div className="border-b p-4">
    <div className="w-full flex items-center ">
      <RxCross1 className='cursor-pointer mx-auto'/>
      <div className=" flex item-center ">
      <img src="images/img5.jpg" alt="doesn't show" 
      className='w-[80px] h-[80px] ml-2 rounded-sm'/>
      </div>
      <div className=' pl-2 '>
        <h5>{data.name}</h5>
        <h4 className='font-[400] text-[15px] text-[#00000082]'> ${data.price} * {value} </h4>
        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Robota'>
          US ${totalPrice}
        </h4>
      </div>
      <div className='mx-auto'>
          <BsCartPlus size={20} className=' cursor-pointer' title='Add to cart'/>
      </div>
    </div> 
  </div>
  
  )
}

export default WishlistSingle
