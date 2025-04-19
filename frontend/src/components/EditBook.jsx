import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Asegúrate de que useNavigate esté importado correctamente
import '../styles/EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Usar useNavigate para definir navigate
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publication_year: '',
    isbn: '',
    available_copies: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los datos actuales del libro
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${id}/`);
        if (!response.ok) throw new Error('No se pudo obtener el libro');
        const data = await response.json();
        setBookData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error('Error al actualizar el libro');
      setError(null); // Si la actualización es exitosa, se resetea el error.
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="edit-book-container">
      <h2>✏️ Editar Libro</h2>
      <form onSubmit={handleSubmit} className="edit-book-form">
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año de publicación:
          <input
            type="number"
            name="publication_year"
            value={bookData.publication_year}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Copias disponibles:
          <input
            type="number"
            name="available_copies"
            value={bookData.available_copies}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn-save">💾 Guardar cambios</button>
        <button type="button" className="btn-cancel" onClick={() => navigate('/')}>↩️ Cancelar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditBook;
