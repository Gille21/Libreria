import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BookForm.css';

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: '',
    isbn: '',
    available_copies: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:8000/api/books/${id}/`)
        .then((res) => res.json())
        .then((data) => setFormData(data));
    }
  }, [id, isEditMode]);

  const validate = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio';
    if (
      !formData.publication_year ||
      isNaN(formData.publication_year) ||
      formData.publication_year < 1000 ||
      formData.publication_year > currentYear
    ) {
      newErrors.publication_year = 'Año inválido';
    }
    if (!formData.isbn || !/^\d{13}$/.test(formData.isbn)) {
      newErrors.isbn = 'El ISBN debe tener 13 dígitos';
    }
    if (formData.available_copies === '' || formData.available_copies < 0) {
      newErrors.available_copies = 'Debe ser un número positivo o cero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'available_copies' || name === 'publication_year' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode
      ? `http://localhost:8000/api/books/${id}/`
      : 'http://localhost:8000/api/books/';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            if (data && typeof data === 'object') {
              setErrors(data);
            }
          });
        }
        navigate('/');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h2>
      <form onSubmit={handleSubmit}>
        {['Título', 'Autor', 'Año de Publicación', 'ISBN (International Standard Book Number)', 'Copias disponibles'].map((field) => (
          <div key={field} className="form-group mb-3">
            <label htmlFor={field} className="form-label">
              {field.replace('_', ' ').toUpperCase()}
            </label>
            <input
              id={field}
              type={field === 'Año de Publicación' || field === 'Copias disponibles' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
            <i className="bi bi-save2-fill"></i> {isEditMode ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary d-flex align-items-center gap-2">
            <i className="bi bi-x-circle-fill"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
