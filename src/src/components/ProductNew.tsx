import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

type ProductStatus = 'EN STOCK' | 'AGOTADO' | 'DESCONTINUADO';

const ProductNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState<ProductStatus>('EN STOCK');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/products', {
        name,
        sku,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        status,
      });
      navigate('/dashboard');
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 409) {
        setError('Ya existe un producto con ese SKU.');
      } else if (status === 400) {
        setError(err.response?.data?.message || 'Datos inválidos.');
      } else if (!err.response) {
        setError('Sin conexión con el servidor.');
      } else {
        setError('Error al crear el producto.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>SKU / Código *</label>
          <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
        </div>
        <div>
          <label>Precio (S/)</label>
          <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div>
          <label>Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)}>
            <option value="EN STOCK">EN STOCK</option>
            <option value="AGOTADO">AGOTADO</option>
            <option value="DESCONTINUADO">DESCONTINUADO</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductNew;


