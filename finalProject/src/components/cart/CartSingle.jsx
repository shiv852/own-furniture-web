import React, { useContext } from 'react'
import { HiOutlineMinus, HiPlus} from "react-icons/hi";
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { Context } from '../../store/Item_store';

const CartSingle = ({data}) => {
  const { updateCartItemQty, removeFromCart } = useContext(Context);
  const totalPrice = data.discount_price ? data.discount_price * data.qty : data.price * data.qty;
  
  // Ensure we have an ID to work with
  const itemId = data.id || '';

  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };

  return (
    <div className="border-b p-4">
    <div className="w-full flex items-center">
      <div>
        <div className={`${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`}
        onClick={() => updateCartItemQty(itemId, data.qty + 1)}>
        <HiPlus size={24} color='#fff'/>
        </div>
        <span className='pl-[10px]'>
          {data.qty}
        </span>
        <div className='bg-[#a7abb14f] rounded w-[25px] h-[25px] justify-center items-center cursor-pointer flex' 
        onClick={() => updateCartItemQty(itemId, data.qty > 1 ? data.qty - 1 : 1)}>
           <HiOutlineMinus size={16} color='#7d879c'/>
        </div>
      </div>
      <img 
        src={data.image_Url && data.image_Url[0] ? getImageUrl(data.image_Url[0].url) : "images/57.png"} 
        alt={data.name || "Product image"} 
        className='w-[80px] h-[80px] ml-2 rounded-sm'
      />
      <div className='pl-[5px]'>
        <h5>{data.name}</h5>
        <h4 className='font-[400] text-[15px] text-[#00000082]'> ${data.discount_price || data.price} * {data.qty} </h4>
        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Robota'>
          US ${totalPrice.toFixed(2)}
        </h4>
      </div>
      <div className='mx-auto'>
      <RxCross1 
        className='cursor-pointer'
        onClick={() => removeFromCart(itemId)}
      />
      </div>
    </div> 
  </div>
  )
}

export default CartSingle
