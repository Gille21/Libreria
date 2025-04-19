import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../components/deleteConfirmation';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const booksPerPage = 10;
  const API_URL = 'http://localhost:8000/api/books/';

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      let filteredBooks = data;

      if (searchTerm) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (onlyAvailable) {
        filteredBooks = filteredBooks.filter((book) => book.available_copies > 0);
      }

      // Ordenar por ISBN de menor a mayor
      filteredBooks.sort((a, b) => {
        if (!a.isbn) return 1;
        if (!b.isbn) return -1;
        return a.isbn.localeCompare(b.isbn, undefined, { numeric: true });
      });

      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, onlyAvailable]);

  const getBookAge = (year) => new Date().getFullYear() - year;

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = books.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleDeleteClick = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  const handleDelete = async (bookId) => {
    try {
      await fetch(`${API_URL}${bookId}/`, { method: 'DELETE' });
      setBooks(books.filter((book) => book.id !== bookId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <div className="booklist-container">
      <div className="booklist-header mb-4">
        <h2 className="text-primary fw-bold">📚 Lista de Libros</h2>
        <Link to="/create" className="add-button"><i className="bi bi-plus-circle-fill"></i> Agregar nuevo libro</Link>
      </div>

      <div className="booklist-controls">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar por título o autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Solo disponibles
        </label>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Año</th>
              <th>ISBN</th>
              <th>Copias</th>
              <th>Antigüedad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_year}</td>
                <td>{book.isbn}</td>
                <td>{book.available_copies}</td>
                <td>{getBookAge(book.publication_year)} años</td>
                <td>
                  <div className="actions">
                    <Link to={`/edit/${book.id}`} className="icon-button text-primary" title="Editar">✏️</Link>
                    <button
                      onClick={() => handleDeleteClick(book.id)}
                      className="icon-button text-danger"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {showDeleteModal && (
        <DeleteConfirmation
          bookId={bookToDelete}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default BookList;
