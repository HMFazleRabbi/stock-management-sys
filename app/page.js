"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [stockData, setStockData] = useState([
    { id: 1, productName: "Product A", quantity: 10, price: 25.99 },
    { id: 2, productName: "Product B", quantity: 20, price: 19.99 },
    { id: 3, productName: "Product C", quantity: 15, price: 12.99 },
    // Add more stock data as needed
  ]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const handleAddProduct = () => {
    if (newProduct.productName && newProduct.quantity && newProduct.price) {
      const updatedStock = [
        ...stockData,
        { ...newProduct, id: stockData.length + 1 },
      ];
      setStockData(updatedStock);
      setNewProduct({ productName: "", quantity: "", price: "" });
    }
  };

  return (
    <>
      <Header />
      <div className="container  mx-auto p-8">
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
      <div className="container  mx-auto p-8">
        <h1 className="text-2xl font-bold mt-8">Display current Stock</h1>

        <table className="border-collapse border border-gray-500 mt-4 w-full bg-blue-50">
          <thead>
            <tr>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">ID</th>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-500 bg-blue-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-500 px-4 py-2">{item.id}</td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {item.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
