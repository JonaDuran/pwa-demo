import { useState, useEffect } from 'react';
import db from './db'

const LIMIT = 50

function useProducts() {
  const [state, setState] = useState({
    loading: 'Cargando...',
    data: []
  })

  useEffect(() => {
    loadProducts().then(products => {
      setState({
        loading: false,
        data: products
      })
    })
  }, [])

  const search = async (event) => {
    const text = event.currentTarget.value || ''

    const products = await db.products
      // .filter(unit => 
      //   unit.c_ClaveProdServ.includes(text) || 
      //   unit.Descripción.includes(text)
      // )
      .where('c_ClaveProdServ')
      .startsWithIgnoreCase(text)
      .or('Descripción')
      .startsWithIgnoreCase(text)
      .limit(LIMIT)
      .toArray()

    setState({
      loading: false,
      data: products
    })
  }

  return { search, ...state }
}

async function loadProducts() {
  if (await db.products.count() === 0 && navigator.onLine) {
    const url = 'https://jonaduran.github.io/pwa-demo/c_ClaveProdServ.json'
    const res = await fetch(url, { cache: 'no-cache' })
    const products = await res.json()
    document.querySelector('#message').textContent = `Guardando ${products.length} registros...`
    await saveProducts(products)
  }

  return await db.products.limit(LIMIT).toArray()
}

async function saveProducts(products) {
  await db.products.clear()
  await db.products.bulkAdd(products)
}

export default useProducts