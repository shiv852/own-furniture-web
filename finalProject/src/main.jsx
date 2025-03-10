import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Content from './routes/Content.jsx'
import { Provider } from 'react-redux'
import furnitureStore from './store/index.js'
import ForgotPassword from './routes/ForgotPassword.jsx'
import LoginUp from './routes/LoginUp.jsx'
import SignUp from './routes/SignUp.jsx'
import ProductdetailsPage from './components/ProductdetailsPage.jsx'
import ProductPage from './routes/ProductPage.jsx'
import ProfilePage from './components/Profile/ProfilePage.jsx'

   const router=createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {path:"/" , element:<Home/>},
        {path:"/content" , element:<Content/>},
        {path:"/products" , element:<ProductPage/>},
        {path:"/login" , element:<LoginUp/>},
        {path:"/forgotpassword" , element:<ForgotPassword/>},
        {path:"/signup" , element:<SignUp/>},
        {path:"/product/:name" , element:<ProductdetailsPage/>},
        {path:"/profilepage" , element:<ProfilePage/>},
      ]
    }
   ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <Provider store={furnitureStore}>
   <RouterProvider router={router}/> 
    </Provider>
  </React.StrictMode>,
)
