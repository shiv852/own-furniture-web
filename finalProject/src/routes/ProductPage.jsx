import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from '../styles/styles';
import Productcard from '../components/product/Productcard';
import { productData } from "../data/Alldata";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true whenever search params change
    setLoading(true);
    
    // Simulate network delay for better user experience with loading state
    const fetchProducts = async () => {
      try {
        let filteredData = [...productData];
        console.log("Initial data:", filteredData.length);
        console.log("Search query:", searchQuery);
        
        // Filter by search term if provided
        if (searchQuery) {
          const searchTermLower = searchQuery.toLowerCase();
          filteredData = filteredData.filter((item) => {
            const nameMatch = item.name?.toLowerCase().includes(searchTermLower);
            const descMatch = item.description?.toLowerCase().includes(searchTermLower);
            const catMatch = item.category?.toLowerCase().includes(searchTermLower);
            return nameMatch || descMatch || catMatch;
          });
          console.log("After search filter:", filteredData.length);
        }
        
        // Filter by category if provided
        if (categoryData) {
          filteredData = filteredData.filter((i) => i.category === categoryData);
          console.log("After category filter:", filteredData.length);
        }
        
        // Sort by total_sell if no filters applied
        if (!categoryData && !searchQuery) {
          filteredData.sort((a, b) => b.total_sell - a.total_sell);
        }
        
        // Simulate network delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryData, searchQuery]);

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <div className={`${styles.section}`}>
          {searchQuery && !loading && (
            <div className="w-full mb-5">
              <h2 className="text-2xl font-semibold">
                Search results for: "{searchQuery}"
              </h2>
              <p className="text-gray-600 mt-2">
                Found {data.length} {data.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          )}
          
          {loading ? (
            // Show loading skeletons
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : data.length > 0 ? (
            // Show products when available
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.map((i, index) => (
                <Productcard data={i} key={index} />
              ))}
            </div>
          ) : (
            // Show no products found message
            <div className="w-full py-20 flex flex-col items-center justify-center">
              <img 
                src="/images/no-results.png" 
                alt="No products found" 
                className="w-40 h-40 object-contain opacity-60 mb-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <h1 className="text-center text-2xl font-medium text-gray-700">
                No products found
              </h1>
              <p className="text-gray-500 text-center mt-2 max-w-md">
                We couldn't find any products matching your search criteria. Try using different keywords or browsing our categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
