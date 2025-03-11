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
    <div className='fixed top-0 left-0 w-full h-screen z-50' >
      <div className='fixed top-0 right-0 min-h-full w-[65%] md:w-[25%] bg-white flex flex-col justify-between shadow-sm' >
          <div >
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                  size={25}
                  className='cursor-pointer'
                  onClick={()=>setopenCart(false)}
                  />
                </div>
                {/* item length */}
                <div className={`${styles.noramlFlex} p-4 `}>
                  <IoBagHandleOutline size={25}/>
                  <h5 className='pl-2 text-[20px] font-[500]'>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </h5>
                </div>
                  <div className="w-full border-t">
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
          </div>
          <div className="px-5 mb-3">
            {/* checkout button */}
            {cart.length > 0 ? (
              <Link to="/checkout">
                <div>
                  <button className={`flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] h-11 text-white outline-none`}>
                    Checkout Now (USD ${cartTotal.toFixed(2)})
                  </button>
                </div>
              </Link>
            ) : (
              <button 
                className={`flex items-center justify-center w-[100%] bg-gray-400 cursor-not-allowed rounded-[5px] h-11 text-white outline-none`}
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
