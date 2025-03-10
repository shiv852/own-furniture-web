

import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from '../common';
import { Context } from '../store/Item_store';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';


function App() {
     const dispatch = useDispatch()

  const fetchUserDatails =async ()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url ,{
        method : SummaryApi.current_user.method,
        credentials : 'include'  // cookie token can't save at the backend that's why i'm use
      })
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
      console.log("data response " , dataResponse) 
    }
  useEffect(()=>{
    fetchUserDatails()
  },[])

  return (
    <>
    <Context.Provider value={{
      fetchUserDatails //user details fetch
    }}>                         
        <ToastContainer />  {/* this is the notification msg like a alt msg toastcontainer  */}
        <Header/>
        <Outlet/>
        <Footer/>
    </Context.Provider>
      
    </>
  )
}

export default App
