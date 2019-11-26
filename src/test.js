import db from './db';

async function units() {
  console.log('start units test')
  
  console.time('units to array')
  const units = await db.units.toArray()
  console.timeEnd('units to array')

  let count = 0, result = null
  console.time('array filter - search watt with')
  result = units.filter(unit => count++ && unit.Nombre.includes('watt'))
  console.timeEnd('array filter - search watt with')
  console.log('count:', count, 'results:', result.length)
  
  count = 0
  console.time('table filter - search watt')
  result = await db.units.filter(unit => count++ && unit.Nombre.includes('watt')).toArray()
  console.timeEnd('table filter - search watt')
  console.log('count:', count, 'results:', result.length)

  // count = 0
  // console.time('table eachKey - search watt')
  // await db.units.orderBy('Nombre').eachKey(key => count++ && key.includes('watt'))
  // console.timeEnd('table eachKey - search watt')
  // console.log('count:', count)
}

async function products() {
  console.log('start products test')
  
  console.time('products to array')
  const products = await db.products.toArray()
  console.timeEnd('products to array')

  let count = 0, result = null
  console.time('array filter - search gatos with')
  result = products.filter(unit => count++ && unit.Descripción.includes('gatos'))
  console.timeEnd('array filter - search gatos with')
  console.log('count:', count, 'results:', result.length)
  
  count = 0
  console.time('table filter - search gatos')
  result = await db.products.filter(unit => count++ && unit.Descripción.includes('gatos')).toArray()
  console.timeEnd('table filter - search gatos')
  console.log('count:', count, 'results:', result.length)

  // count = 0
  // console.time('table eachKey - search gatos')
  // await db.products.orderBy('Descripción').eachKey(key => count++ && key.includes('gatos'))
  // console.timeEnd('table eachKey - search gatos')
  // console.log('count:', count)
}

export default { units, products }