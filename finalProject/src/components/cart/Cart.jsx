import React, { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import { IoBagHandleOutline  } from 'react-icons/io5'
import CartSingle from './CartSingle'
import { Context } from '../../store/Item_store'
import { Link } from 'react-router-dom'

const Cart = ({setopenCart}) => {
  const { cart, getCartTotal, getCartItemCount } = useContext(Context);
  const itemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 bg-[#0000004b]'>
      <div className='fixed top-0 right-0 h-screen w-[65%] md:w-[25%] bg-white flex flex-col shadow-sm overflow-hidden'>
          {/* Header with close button */}
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className='cursor-pointer'
              onClick={()=>setopenCart(false)}
            />
          </div>
          
          {/* Cart header with count */}
          <div className={`${styles.noramlFlex} p-4 border-b`}>
            <IoBagHandleOutline size={25}/>
            <h5 className='pl-2 text-[20px] font-[500]'>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </h5>
          </div>

          {/* Scrollable cart items container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartSingle key={index} data={item} />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center">
                <h5>Cart is empty!</h5>
              </div>
            )}
          </div>

          {/* Checkout button */}
          <div className="px-5 py-3 border-t">
            {cart.length > 0 ? (
              <Link to="/checkout" className="block w-full">
                <button className={`flex items-center justify-center w-full bg-[#e44343] rounded-[5px] h-11 text-white outline-none hover:opacity-90 transition-opacity`}>
                  Checkout Now (USD ${cartTotal.toFixed(2)})
                </button>
              </Link>
            ) : (
              <button 
                className={`flex items-center justify-center w-full bg-gray-400 cursor-not-allowed rounded-[5px] h-11 text-white outline-none`}
                disabled
              >
                Checkout Now (USD $0.00)
              </button>
            )}
          </div>
      </div>
    </div>
  )
}

export default Cart
