"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stockData, setStockData] = useState([
    // { productName: "mt-wat-12", quantity: 10, price: 25.99 },
    // { productName: "zt-cannon-12", quantity: 20, price: 19.99 },
    // { productName: "nt-aqua-12", quantity: 15, price: 12.99 },
    // // Add more stock data as needed
  ]);

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      // console.log(rjson);
      setStockData(rjson.products);
      setAlert("");
    };
    fetchStocks();
  }, []);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const [alert, setAlert] = useState("");

  const [dropdown, setDropdown] = useState([]);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [loadingAction, setLoadingAction] = useState(false);

  const handleAddProduct = async () => {
    if (
      newProduct.productName &&
      !isNaN(parseFloat(newProduct.quantity)) &&
      !isNaN(parseFloat(newProduct.price))
    ) {
      try {
        // Construct the request body
        const requestBody = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        };

        // Send a POST request using fetch
        const response = await fetch("/api/product", requestBody);
        const data = await response.json();
        // console.log(data.product)
        // console.log(newProduct)

        // Add the new product to the stock data
        const updatedStock = [...stockData, newProduct];
        setStockData(updatedStock);
        setNewProduct({ productName: "", quantity: "", price: "" });
        if (data.success) {
          setAlert("Your product has been updated!");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        setAlert("An error occurred while adding the product");
      }
    }
  };

  const onDropdownEdit = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    let counter = 0;
    let previousQuery = query;

    setLoading(true);

    while (counter < 5) {
      const response = await fetch("api/search?query=" + newQuery);
      const rjson = await response.json();

      if (query === previousQuery) {
        setDropdown(rjson.products);
        setLoading(false);
        break; // Exit the loop if there's no change in the query
      }

      previousQuery = query;
      counter++;
    }
  };

  const buttonAction = async (action, productName, initialQuantity) => {
    //Change quantity of product

    console.log("buttonAction pressed: ", action, productName, initialQuantity);
    setLoadingAction(true);

    // Construct the request body
    const requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, productName, initialQuantity }),
    };

    // Send a POST request using fetch
    const response = await fetch("/api/action", requestBody);
    const data = await response.json();

    setLoadingAction(false);

    // Make chainges to Table
    let index = stockData.findIndex((item)=> item.productName ==productName);
    console.log("index:", index)
    let newProduct = JSON.parse(JSON.stringify(stockData))
    if (action=='plus'){
      newProduct[index].quantity = parseInt(initialQuantity) + 1;
    }
    else if (action ='subtract') {
      newProduct[index].quantity = parseInt(initialQuantity) - 1;
    } 
    console.log("newProduct:", newProduct)
    setStockData(newProduct)


     // Make chainges to indexdropdown
     let indexdropdown = dropdown.findIndex((item)=> item.productName == productName);
     console.log("indexdropdown:", indexdropdown)
     let newDropdown = JSON.parse(JSON.stringify(dropdown))
     console.log("newDropdown", newDropdown)
     if (action=='plus'){
      newDropdown[indexdropdown].quantity = parseInt(initialQuantity) + 1;
     }
     else if (action ='subtract') {
      newDropdown[indexdropdown].quantity = parseInt(initialQuantity) - 1;
     } 
     console.log("newProduct:", newDropdown)
     setDropdown(newDropdown)


  };
  return (
    <>
      <Header />
      <div className="container mx-auto px-8 mt-10">
        {/* Conditional rendering of the alert div */}
        {alert && (
          <div className="text-green-800 font-bold w-50 py-2 my-5 bg-green-50 text-center rounded">
            {alert}
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">Search Product</h1>
        <div className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            placeholder="Search..."
            onChange={onDropdownEdit}
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

        <div className="dropcontainer absolute w-[72vw]  bg-blue-50 rounded">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            dropdown.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-blue-100 p-3 my-3 rounded"
              >
                <div>
                  <span className="font-bold">{item.productName}</span>
                  <span className="text-gray-600">
                    {" "}
                    ({item.quantity} available)
                  </span>
                  <span className="text-purple-500"> for $({item.price})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={loadingAction}
                    onClick={() => {
                      buttonAction("plus", item.productName, item.quantity);
                    }}
                    className={`px-4 py-1 rounded-xl border-b-2 transition duration-300 ${
                      loadingAction
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    +
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    disabled={loadingAction}
                    onClick={() => {
                      buttonAction("minus", item.productName, item.quantity);
                    }}
                    className={`px-4 py-1 rounded-xl border-b-2 transition duration-300 ${
                      loadingAction
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-green-600"
                    }`}
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          )}
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
