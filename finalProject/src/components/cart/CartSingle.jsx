// ye mera bag hai side mein se bug mein item honge vo idher dekhenge
import React from 'react'
import { HiOutlineMinus, HiPlus} from "react-icons/hi";
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

const CartSingle = ({data}) => {
  const dispatch = useDispatch();
  const totalPrice = data.discount_price * data.quantity;

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

  const handleIncrement = () => {
    dispatch(updateQuantity({
      id: data.id,
      quantity: data.quantity + 1
    }));
  };

  const handleDecrement = () => {
    if (data.quantity === 1) return;
    dispatch(updateQuantity({
      id: data.id,
      quantity: data.quantity - 1
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({
      id: data.id
    }));
  };

  return (
    <div className="border-b p-4 bg-white w-full">
      <div className="w-full flex items-center">
        <div>
          <div 
            className={`${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`}
            onClick={handleIncrement}
          >
            <HiPlus size={18} color='#fff'/>
          </div>
          <span className='pl-[10px]'>
            {data.quantity}
          </span>
          <div 
            className='bg-[#a7abb14f] rounded w-[25px] h-[25px] justify-center items-center cursor-pointer flex' 
            onClick={handleDecrement}
          >
            <HiOutlineMinus size={16} color='#7d879c'/>
          </div>
        </div>
        <img 
          src={getImageUrl(data.image_Url)} 
          alt={data.name} 
          className='w-[80px] h-[80px] ml-2 rounded-sm object-contain'
        />
        <div className='pl-[5px]'>
          <h5 className="font-medium">{data.name}</h5>
          <h4 className='font-[400] text-[15px] text-[#00000082]'> ${data.discount_price} * {data.quantity} </h4>
          <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Robota'>
            US ${totalPrice.toFixed(2)}
          </h4>
        </div>
        <div className='mx-auto'>
          <RxCross1 className='cursor-pointer' onClick={handleRemove}/>
        </div>
      </div> 
    </div>
  )
}

export default CartSingle
