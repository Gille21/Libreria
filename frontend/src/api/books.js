import axios from 'axios';

// Dirección de tu API de Django
const API_URL = 'http://localhost:8000/api/books/';

export const getBooks = () => {
  return axios.get(API_URL);
};

export const getBook = (id) => {
  return axios.get(`${API_URL}${id}/`);
};

export const createBook = (bookData) => {
  return axios.post(API_URL, bookData);
};

export const updateBook = (id, bookData) => {
  return axios.put(`${API_URL}${id}/`, bookData);
};

export const deleteBook = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};
