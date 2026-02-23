import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Add Product
  const addProduct = async (formData) => {
    try {
      const res = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProducts((prev) => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Upload failed'
      };
    }
  };

  // 3. Update Product
  const updateProduct = async (id, formData) => {
    try {
      const res = await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      return { success: true };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return { success: false };
    }
  };

const getByProductId = async (id) => {
  try {
    setLoading(true);
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    setLoading(false);
  }
};


  // 4. Delete Product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      return { success: true };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return { success: false };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getByProductId,
        refreshProducts:fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);

export default ProductContext;