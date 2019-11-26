import { useState, useEffect } from 'react';
import db from './db'

const LIMIT = 50

function useUnits() {
  const [state, setState] = useState({
    loading: 'Cargando...',
    data: []
  })

  useEffect(() => {
    loadUnits().then(units => {
      setState({
        loading: false,
        data: units.slice(0, LIMIT),
        fullData: units
      })
    })
  }, [])

  const search = async (event) => {
    const text = (event.currentTarget.value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    let units = []
    let count = 0

    if (!text) {
      units = state.fullData.slice(0, LIMIT)
    } else {
      for (const unit of state.fullData) {

        const includeText = 
          String(unit.c_ClaveUnidad).includes(text) || 
          String(unit.Nombre).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(text)

        if (includeText) {
          units.push(unit)
          if (++count >= 50) {
            break
          }
        }
      }
    }

    setState({
      loading: false,
      data: units,
      fullData: state.fullData
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

  return await db.units.toArray()
}

async function saveUnits(units) {
  await db.units.clear()
  await db.units.bulkAdd(units)
}

export default useUnits