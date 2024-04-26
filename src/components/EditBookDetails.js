import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../urls/BaseUrl";
import { useParams, useNavigate } from "react-router-dom";

function EditBookDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();


  const [initialBookDetails, setInitialBookDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    publishDate: "",
    price: 0
  });

  useEffect(() => {

    const fetchInitialBookDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/editBook/${id}`);
        const initialBook = response.data.book;
        setInitialBookDetails(initialBook);
        setFormData({
          name: initialBook.name,
          description: initialBook.description,
          publishDate: initialBook.publishDate,
          price: initialBook.price
        });
      } catch (error) {
        console.error("Error fetching initial book details:", error);
      }
    };

    fetchInitialBookDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseurl}/editBook/${id}`, formData);
      console.log(response.data);
      if (response.data.message === "Book edited successfully") {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <div>
      <h1>Edit the Book Details</h1>
      {initialBookDetails ? (
        <form onSubmit={handleSubmit} className="bookInputForm">
          <input
            type="text"
            placeholder={initialBookDetails[0].name}
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder={initialBookDetails[0].description}
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder={initialBookDetails[0].publishDate}
            name="publishDate"
            value={formData.publishDate || ""}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder={initialBookDetails[0].price}
            name="price"
            value={formData.price || ""}
            onChange={handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditBookDetails;
