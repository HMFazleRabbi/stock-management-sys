"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stockData, setStockData] = useState([
    { productName: "mt-wat-12", quantity: 10, price: 25.99 },
    { productName: "zt-cannon-12", quantity: 20, price: 19.99 },
    { productName: "nt-aqua-12", quantity: 15, price: 12.99 },
    // Add more stock data as needed
  ]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const handleAddProduct = async () => {
    if (
      newProduct.productName &&
      !isNaN(parseFloat(newProduct.quantity)) &&
      !isNaN(parseFloat(newProduct.price))
    ) {
      // Construct the request body
      const requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      };

      // Send a POST request using fetch
      const response = fetch("/api/product", requestBody)
        .then((response) => {
          console.log(response);
          // Add the new product to the stock data
          const updatedStock = [...stockData, { ...newProduct }];
          setStockData(updatedStock);
          setNewProduct({ productName: "", quantity: "", price: "" });
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 mt-10">
        <h1 className="text-2xl font-bold mb-4">Search Product</h1>
        <div className="flex items-center space-x-4 mb-8">
          <input
            type="text"
            placeholder="Search..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-500 px-2 py-1 w-full rounded"
          />
          <select
            // value={searchCategory}
            // onChange={(e) => setSearchCategory(e.target.value)}
            className="border border-gray-500 px-2 py-1 rounded"
          >
            <option value="productName">Product Name</option>
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto px-8 mt-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Add a Product</h1>
          <div className="border bg-blue-50 rounded p-4">
            <form>
              <label htmlFor="productName" className="block mb-2">
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
                className="border border-gray-500 px-2 py-1 mb-2 w-full rounded"
              />
              <label htmlFor="quantity" className="block mb-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                className="border border-gray-500 px-2 py-1 mb-2 w-full rounded"
              />
              <label htmlFor="price" className="block mb-2">
                Price:
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border border-gray-500 px-2 py-1 mb-2 w-full rounded"
              />
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 mt-10">
        <h1 className="text-2xl font-bold">Display current Stock</h1>
        <table className="border-collapse border border-gray-500 mt-4 w-full bg-blue-50">
          <thead>
            <tr>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">
                Product Name
              </th>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">
                Quantity
              </th>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {Number(item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
