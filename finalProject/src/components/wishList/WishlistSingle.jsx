import React, { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from "react-icons/bs";
import { Context } from '../../store/Item_store';
import { toast } from 'react-toastify';

const WishlistSingle = ({data}) => {
  const { removeFromWishlist, moveToCart } = useContext(Context);
  
  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };
  
  // Handle remove from wishlist
  const handleRemoveFromWishlist = () => {
    removeFromWishlist(data.id);
    toast.success("Item removed from wishlist!");
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    moveToCart(data.id);
    toast.success("Item added to cart!");
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 
          className='cursor-pointer mx-auto' 
          onClick={handleRemoveFromWishlist}
        />
        <div className="flex item-center">
          <img 
            src={data.image_Url && data.image_Url[0] ? getImageUrl(data.image_Url[0].url) : "images/img5.jpg"} 
            alt={data.name || "Product image"} 
            className='w-[80px] h-[80px] ml-2 rounded-sm'
          />
        </div>
        <div className='pl-2'>
          <h5>{data.name}</h5>
          <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discount_price || data.price}</h4>
        </div>
        <div className='mx-auto'>
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
