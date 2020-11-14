import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/trails");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/trails/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/trails/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/trails", bookData);
  }
};