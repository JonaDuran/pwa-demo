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
        data: products.slice(0, LIMIT),
        fullData: products
      })
    })
  }, [])

  const search = async (event) => {
    const text = (event.currentTarget.value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    let products = []
    let count = 0

    if (!text) {
      products = state.fullData.slice(0, LIMIT)
    } else {
      for (const product of state.fullData) {

        const includeText = 
          String(product.c_ClaveProdServ).includes(text) || 
          String(product.Descripción).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(text)

        if (includeText) {
          products.push(product)
          if (++count >= 50) {
            break
          }
        }
      }
    }

    setState({
      loading: false,
      data: products,
      fullData: state.fullData
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

  return await db.products.toArray()
}

async function saveProducts(products) {
  await db.products.clear()
  await db.products.bulkAdd(products)
}

export default useProducts