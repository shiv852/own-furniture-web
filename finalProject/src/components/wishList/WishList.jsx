import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import WishlistSingle from './WishlistSingle'
import { AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const WishList = ({setOpenWishlist}) => {
  // Get wishlist data from Redux store
  const { wishlist, totalItems } = useSelector((state) => state.wishlist);

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50'>
      <div className='fixed top-0 right-0 min-h-full w-[65%] md:w-[25%] bg-white flex flex-col justify-between shadow-sm'>
          <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className='cursor-pointer'
                    onClick={()=>setOpenWishlist(false)}
                  />
                </div>
                {/* item length */}
                <div className={`${styles.noramlFlex} p-4`}>
                  <AiOutlineHeart size={25}/>
                  <h5 className='pl-2 text-[20px] font-[500]'>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </h5>
                </div>
                <div className="w-full border-t">
                  {wishlist && wishlist.length > 0 ? (
                    wishlist.map((item, index) => (
                      <WishlistSingle key={index} data={item} />
                    ))
                  ) : (
                    <div className="w-full h-[40vh] flex items-center justify-center">
                      <h4 className="text-center font-medium">Wishlist is empty!</h4>
                    </div>
                  )}
                </div>
          </div>
      </div>
    </div>
  )
}

export default WishList
