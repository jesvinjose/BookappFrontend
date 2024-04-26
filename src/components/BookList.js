import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../urls/BaseUrl";

function BookList() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/addBook");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]); 
  const fetchBooks = async () => {
    try {
      console.log('working');
      const response = await axios.get(`${baseurl}/books?q=${searchQuery}`);
      if (response.data) {
        setBooks(response.data.books);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }

  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseurl}/deleteBook/${id}`); 
      if (response.status === 200) {
        setBooks(response.data.updatedBooks);
      } else {
        console.error("Failed to delete book with id:", id);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/editBook/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const displayData = books.filter((_, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  return (
    <div>
      <h1>List of Books</h1>
      <div className="searchAndaddIcons">
        <input
          placeholder="Search Name or Description"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleAdd}>Add Book</button>
      </div>
      <div className="outerDivTable">
        <table className="bookTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Published Date</th>
              <th>Price</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((book) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>{book.date}</td>
                <td>{book.price}</td>
                <td>
                  <div className="buttonContainer">
                    <button onClick={() => handleEdit(book._id)}>Edit</button>
                    <button onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="ml-5"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <button
          className="ml-10"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
