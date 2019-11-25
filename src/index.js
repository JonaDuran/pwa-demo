import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProducts from './AppProducts';
import AppUnits from './AppUnits';
import * as serviceWorker from './serviceWorker';
import db from './db';
import test from './test';

// test.units()

function Index() {
  const [path, setPath] = useState(window.location.hash)

  const linkProps = (key) => ({
    href: '#' + key,
    onClick: () => setPath('#' + key)
  })

  if (path === '#clear') {
    db.delete()
    window.location.hash = ''
    window.location.reload()
  }

  return (
    <main>
      {!path &&
        <h3>
          Seleccione una opción
        </h3>
      }
      <div id="menu">
        <a {...linkProps('countries')}>Países</a>
        <a {...linkProps('units')}>Unidades</a>
        <a {...linkProps('products')}>Productos</a>
        <a {...linkProps('clear')}>Borrar caché</a>
      </div>
      {path === '#countries' && <App />}
      {path === '#units' && <AppUnits />}
      {path === '#products' && <AppProducts />}
    </main>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
