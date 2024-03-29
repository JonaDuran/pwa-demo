import { useState, useEffect } from 'react';
import db from './db'

const LIMIT = 50

function useUnits() {
  const [state, setState] = useState({
    loading: true,
    data: []
  })

  useEffect(() => {
    loadUnits().then(units => {
      setState({
        loading: false,
        data: units
      })
    })
  }, [])

  const search = async (event) => {
    const text = event.currentTarget.value || ''

    const units = await db.units
      // .filter(unit => 
      //   unit.c_ClaveUnidad.includes(text) || 
      //   unit.Nombre.includes(text)
      // )
      .where('c_ClaveUnidad')
      .startsWithIgnoreCase(text)
      .or('Nombre')
      .startsWithIgnoreCase(text)
      .limit(LIMIT)
      .toArray()

    setState({
      loading: false,
      data: units
    })
  }

  return { search, ...state }
}

async function loadUnits() {
  if (await db.units.count() === 0 && navigator.onLine) {
    const url = 'https://jonaduran.github.io/pwa-demo/c_ClaveUnidad.json'
    const res = await fetch(url, { cache: 'no-cache' })
    const units = await res.json()
    document.querySelector('#message').textContent = `Guardando ${units.length} registros...`
    await saveUnits(units)
  }

  return await db.units.limit(LIMIT).toArray()
}

async function saveUnits(units) {
  await db.units.clear()
  await db.units.bulkAdd(units)
}

export default useUnits