import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/create" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
