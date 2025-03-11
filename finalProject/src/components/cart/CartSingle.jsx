// ye mera bag hai side mein se bug mein item honge vo idher dekhenge
import React, { useState } from 'react'
import { HiOutlineMinus, HiPlus} from "react-icons/hi";
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';


const CartSingle = ({data}) => {

  const [value , setValue] = useState(1);
  const totalPrice = data.price*value;

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
    <div className="border-b p-4 bg-black w-full h-full">
    <div className="w-full flex items-center">
      <div>
        <div className={`${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`}
        onClick={()=>setValue(value + 1)}>
        <HiPlus size={24} color='#fff'/>
        </div>
        <span className='pl-[10px]'>
          {value}
        </span>
        <div className='bg-[#a7abb14f] rounded w-[25px] h-[25px] justify-center items-center cursor-pointer flex' onClick={()=> setValue(value === 1 ? 1 :value -1)}>
           <HiOutlineMinus size={16} color='#7d879c'/>
        </div>
      </div>
      <img 
        src={getImageUrl("images/57.png")} 
        alt="Product image" 
        className='w-[80px] h-[80px] ml-2 rounded-sm'
      />
      <div className='pl-[5px]'>
        <h5>{data.name}</h5>
        <h4 className='font-[400] text-[15px] text-[#00000082]'> ${data.price} * {value} </h4>
        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Robota'>
          US ${totalPrice}
        </h4>
      </div>
      <div className='mx-auto'>
      <RxCross1 className='cursor-pointer'/>
      </div>
    </div> 
  </div>
  )
}

export default CartSingle
