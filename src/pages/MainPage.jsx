import { useState } from "react";
import AdContainer from "../components/AdContainer";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

function MainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await BasicAuthProvider(
          "product/allProducts"
        ).getMethod();
        setProducts(response?.products);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="w-full pt-[104px] md:pt-20">
      <AdContainer />
      <div className="product-heading font-bold p-2 px-8 text-lg">
        Latest Suggestions
      </div>
      <div className="product-card-container w-full px-4 md:px-10 py-4 flex flex-wrap gap-4 justify-center">
        {products?.map((products, index) => (
          <ProductCard products={products} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
