import React, { useContext } from 'react'
import { HiOutlineMinus, HiPlus} from "react-icons/hi";
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { Context } from '../../store/Item_store';
import { toast } from 'react-toastify';
import { BsTrash } from 'react-icons/bs';

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

  // Handle remove from cart
  const handleRemoveFromCart = () => {
    removeFromCart(itemId);
    toast.success("Item removed from cart!");
  };

  return (
    <div className="border-b p-4 hover:bg-gray-50 transition-colors">
      <div className="w-full flex flex-wrap items-center">
        {/* Product image with shadow */}
        <div className="w-[80px] h-[80px] rounded-lg overflow-hidden shadow-sm mr-3 bg-white flex items-center justify-center">
          <img 
            src={data.image_Url && data.image_Url[0] ? getImageUrl(data.image_Url[0].url) : "images/57.png"} 
            alt={data.name || "Product image"} 
            className='w-[70px] h-[70px] object-contain'
          />
        </div>
        
        {/* Product details */}
        <div className="flex-1">
          <h5 className="text-sm font-medium line-clamp-1 text-gray-800">{data.name}</h5>
          
          <div className="flex items-center justify-between mt-2">
            {/* Price info */}
            <div>
              <div className="flex items-center gap-2">
                <h4 className='text-[14px] text-gray-500'>${data.discount_price || data.price} × {data.qty}</h4>
              </div>
              <h4 className='font-bold text-[17px] text-[#4a4a4a] mt-1'>
               <p className='no-underline'>${totalPrice.toFixed(2)}</p> 
              </h4>
            </div>
            
            {/* Quantity controls */}
            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
              <button 
                className='bg-white rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm hover:shadow transition-all' 
                onClick={() => updateCartItemQty(itemId, data.qty > 1 ? data.qty - 1 : 1)}
              >
                <HiOutlineMinus size={14} className="text-gray-600" />
              </button>
              
              <span className='px-3 font-medium text-gray-800'>
                {data.qty}
              </span>
              
              <button 
                className='bg-[#e44343] rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm hover:shadow transition-all' 
                onClick={() => updateCartItemQty(itemId, data.qty + 1)}
              >
                <HiPlus size={14} color='#fff'/>
              </button>
            </div>
          </div>
        </div>
        
        {/* Remove button */}
        <div className="w-full flex justify-end mt-2">
          <button 
            className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-xs"
            onClick={handleRemoveFromCart}
          >
            <BsTrash size={14} className="mr-1" />
            Remove
          </button>
        </div>
      </div> 
    </div>
  )
}

export default CartSingle
