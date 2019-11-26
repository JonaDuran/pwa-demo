import React from 'react';
import useUnits from './useUnits2'
import './App.css';

function App() {
  const { loading, data, search } = useUnits()
  
  return (
    <main>
      <h2>Catálogo de Unidades</h2>

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
          <UnitsTable units={data} />
        }

      </div>
    </main>
  );
}

function UnitsTable({ units }) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Clave</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {units.map((unit, i) =>
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{unit.c_ClaveUnidad}</td>
            <td>{unit.Nombre}</td>
          </tr>
        )}

        { units.length >= 50 &&
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
