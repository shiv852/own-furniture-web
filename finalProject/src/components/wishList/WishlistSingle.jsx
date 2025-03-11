import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../store/wishlistSlice';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';

const WishlistSingle = ({data}) => {
  const dispatch = useDispatch();
  
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
  
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist({
      id: data.id
    }));
    toast.success("Item removed from wishlist!");
  };
  
  const handleAddToCart = () => {
    const cartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      discount_price: data.discount_price,
      description: data.description,
      quantity: 1,
      image_Url: data.image_Url,
      shop: data.shop
    };
    
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart successfully!");
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 
          className='cursor-pointer'
          onClick={handleRemoveFromWishlist}
        />
        <div className="flex items-center ml-2">
          <img 
            src={getImageUrl(data.image_Url)} 
            alt={data.name} 
            className='w-[80px] h-[80px] rounded-sm object-contain'
          />
        </div>
        <div className='pl-[15px]'>
          <h5 className="font-medium">{data.name}</h5>
          <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discount_price}</h4>
          {data.price && data.price > data.discount_price && (
            <h4 className='font-[400] text-[13px] text-[#00000082] line-through'>
              ${data.price}
            </h4>
          )}
        </div>
        <div className='ml-auto'>
          <BsCartPlus 
            size={20} 
            className='cursor-pointer' 
            title='Add to cart'
            onClick={handleAddToCart}
          />
        </div>
      </div> 
    </div>
  )
}

export default WishlistSingle
