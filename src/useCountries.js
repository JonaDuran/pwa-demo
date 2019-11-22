import { useState, useEffect } from 'react';
import db from './db'

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
      .toArray()

    setState({
      loading: false,
      data: result
    })
  }

  return { search, ...state }
}

async function loadCountries() {
  if (navigator.onLine) {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json()
    saveCountries(countries) // no await
    return countries
  } else {
    return await db.countries.toArray()
  }
}

async function saveCountries(countries) {
  await db.countries.clear()
  await db.countries.bulkAdd(countries)
  console.log('end saveCountries')
}

export default useCountries