import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import video from "../videos/1video.mp4";
import "./HeadingVideo.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { productData } from "../data/Alldata";

const HeadingVideo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(()=>{
    gsap.from(".title1",{
      delay:0.5,
      opacity:0,
      duration:2,
      x:-50, 
    })
  })
  useGSAP(()=>{
    gsap.from(".title2",{
      delay:0.5,
      opacity:1,
      duration:1,
      x:50, 
    })
  })
  useGSAP(()=>{
    gsap.from(".form",{
      delay:0.5,
      opacity:1,
      duration:1,
      y:50, 
    })
  })
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const searchTermLower = searchTerm.toLowerCase();
      const filteredProducts = productData
        .filter(product => 
          product.name.toLowerCase().includes(searchTermLower) || 
          (product.category && product.category.toLowerCase().includes(searchTermLower))
        )
        .slice(0, 4); // Limit to 4 suggestions for better fit
      
      setSuggestions(filteredProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    
    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) {
      setError("Please enter a search term");
      return;
    }

    console.log("Searching for:", trimmedSearch);
    setShowSuggestions(false);
    navigate(`/products?search=${encodeURIComponent(trimmedSearch)}`);
  };
  
  const handleSuggestionClick = (productId) => {
    // Navigate to the specific product detail page
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  // Function to get image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `/${path}`;
  };
  
  return (
    <div className="hero">
      <video id="video" className="lg:z-0"
        src={video}
        autoPlay
        loop
        muted
        style={{ width: "100%" }}/>

       <div className="overlay"></div>
       <div className="contentt">
         <div className="mt-5">
           <h1 className="title1">jaipur furniture</h1>
           <h2 className="title2">Top 1% Location design in worldwide</h2>
           <form onSubmit={handleSearch} className="form">
             <div className="relative w-full" ref={suggestionsRef}>
               <input 
                 type="text" 
                 name="text" 
                 placeholder="Search furniture, chairs, tables..." 
                 className="input w-full"
                 value={searchTerm}
                 onChange={(e) => {
                   setSearchTerm(e.target.value);
                   setError("");
                 }}
                 onFocus={() => {
                   if (suggestions.length > 0) {
                     setShowSuggestions(true);
                   }
                 }}
               />
               {error && (
                 <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
                   {error}
                 </p>
               )}
               
               {/* Responsive suggestions dropdown */}
               {showSuggestions && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-lg mt-1 z-50 max-h-64 sm:max-h-72 overflow-y-auto overflow-x-hidden">
                   {suggestions.map((product) => (
                     <div 
                       key={product.id}
                       className="flex items-center p-2 sm:p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                       onClick={() => handleSuggestionClick(product.id)}
                     >
                       {/* Responsive image size */}
                       <div className="w-12 h-12 sm:w-14 sm:h-14 min-w-12 sm:min-w-14 flex-shrink-0 overflow-hidden rounded-md mr-2 sm:mr-3">
                         <img 
                           src={getImageUrl(product.image_Url?.[0]?.url)} 
                           alt={product.name} 
                           className="h-full w-full object-cover object-center"
                           loading="lazy"
                         />
                       </div>
                       <div className="flex-1 min-w-0">
                         {/* Responsive text formatting */}
                         <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-full">
                           {product.name.length > 30 && window.innerWidth < 640 
                             ? product.name.substring(0, 30) + '...' 
                             : product.name}
                         </h4>
                         <p className="text-xs text-gray-500 truncate max-w-full hidden sm:block">
                           {product.category}
                         </p>
                         <p className="text-xs sm:text-sm font-semibold text-gray-800">
                           ${product.discount_price || product.price}
                         </p>
                       </div>
                     </div>
                   ))}
                   <div className="p-2 bg-gray-50 text-center border-t border-gray-200">
                     <button 
                       type="button"
                       className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                       onClick={(e) => {
                         e.preventDefault();
                         setShowSuggestions(false);
                         handleSearch(e);
                       }}
                     >
                       View all results
                     </button>
                   </div>
                 </div>
               )}
             </div>
             <button
               type="submit"
               className="relative py-2 px-4 sm:px-6 text-black text-sm sm:text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
               Search
             </button>
           </form>
         </div>
       </div>
    </div>
  );
};

export default HeadingVideo;
