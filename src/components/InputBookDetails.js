import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../urls/BaseUrl";
import { useNavigate } from "react-router-dom";

function InputBookDetails() {
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log("inside handleSubmit");
    try {
      const response = await axios.post(`${baseurl}/addBook`, formData);
      console.log(response.data); 
      setFormData({});
      if(response.data.message=== 'Book added successfully'){
        navigate('/')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    publishDate: "",
    price: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Enter the Book Details</h1>
      <form onSubmit={handleSubmit} className="bookInputForm">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          placeholder="Enter Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
}

export default InputBookDetails;
