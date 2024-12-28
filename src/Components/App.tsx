import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MusicCardPage from "../pages/MusicCardPage.tsx";
import ProductDetailsPage from "../pages/ProductDetailsPage.tsx";
import CreateProductPage from "../pages/CreateProductPage.tsx";
import '../scss/App.scss';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/products"/>} />
            <Route path="/products" element={<MusicCardPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
    </Router>
  )
}

export default App
