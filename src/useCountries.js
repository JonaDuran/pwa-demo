import { useState, useEffect } from 'react';
import db from './db'

const LIMIT = 50

function useCountries() {
  const [state, setState] = useState({
    loading: true,
    data: []
  })

  useEffect(() => {
    loadCountries().then(countries => {
      setState({
        loading: false,
        data: countries
      })
    })
  }, [])

  const search = async (event, val) => {
    const text = event.currentTarget.value || ''

    const result = await db.countries
      .where('name')
      .startsWithIgnoreCase(text)
      .or('region')
      .startsWithIgnoreCase(text)
      .or('capital')
      .startsWithIgnoreCase(text)
      .limit(LIMIT)
      .toArray()

    setState({
      loading: false,
      data: result
    })
  }

  return { search, ...state }
}

async function loadCountries() {
  if (await db.countries.count() === 0 && navigator.onLine) {
    const url = 'https://restcountries.eu/rest/v2/all'
    const res = await fetch(url, { cache: 'no-cache' })
    const countries = await res.json()
    document.querySelector('#message').textContent = `Guardando ${countries.length} registros...`
    await saveCountries(countries)
  }

  return await db.countries.limit(LIMIT).toArray()
}

async function saveCountries(countries) {
  await db.countries.clear()
  await db.countries.bulkAdd(countries)
  console.log('end saveCountries')
}

export default useCountries