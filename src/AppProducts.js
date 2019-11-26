import React from 'react';
import useProducts from './useProducts2'
import './App.css';

function App() {
  const { loading, data, search } = useProducts()
  
  return (
    <main>
      <h2>Catálogo de Productos y Servicios</h2>

      <div className="card">
        <input placeholder="Buscar..." onChange={search} />
      </div>

      <div className="card">
        {loading &&
          <div id="message" className="p">
            Cargando...
          </div>
        }

        {(!loading && data.length === 0) &&
          <div className="p">
            No se pudieron cargar los datos
          </div>
        }

        {data.length > 0 &&
          <ProductsTable products={data} />
        }

      </div>
    </main>
  );
}

function ProductsTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Clave</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) =>
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{product.c_ClaveProdServ}</td>
            <td>{product.Descripción}</td>
          </tr>
        )}
        { products.length >= 50 &&
          <tr>
            <td colSpan="3">
              Solo se muestran 50 resultados
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default App;
