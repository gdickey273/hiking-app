import axios from "axios";

// export default {
//   // Gets all trails
//   getTrails: function() {
//     return axios.get("/api/trails");
//   },
//   // Gets the trail with the given id
//   getTrail: function(id) {
//     return axios.get("/api/trails/" + id);
//   },
//   // Deletes the trail with the given id
//   deleteTrail: function(id) {
//     return axios.delete("/api/trails/" + id);
//   },
//   // Saves a trail to the database
//   saveTrail: function(trailData) {
//     return axios.post("/api/trals", trailData);
//   }
// };

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
