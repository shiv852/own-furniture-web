import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import { IoBagHandleOutline  } from 'react-icons/io5'
import CartSingle from './CartSingle'

const Cart = ({setopenCart}) => {
  
  const cartData =[
    {
      name:"kushan sofa",
      description:"test",
      price:999,
    },
   
    {
      name:"curve blue sofa",
      description:"test",
      price:999,
    },
  ]

  return (
    <div className='fixed top-0 left-0 w-full  h-screen z-50' >
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
                          2 items
                  </h5>
                </div>
                  <div className="w-full border-t">
                      {
                        cartData && cartData.map((i , index)=>
                          <CartSingle key={index} data={i}/>
                      )
                      }
                  </div>
          </div>
          <div className="px-5 mb-3">
            {/* checkout button */}
            {/* <Link to="/checkout"> */}
                <div >
                   <button className={` flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] h-11 text-white outline-none`}>
                  checkout Now (USD$1000)
                   </button>
                </div>
            {/* </Link> */}
          </div>
      </div>
    </div>
  )
}



export default Cart
