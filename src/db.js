import Dexie from 'dexie';

const db = new Dexie('pwa-demo');
db.version(1).stores({
    countries: '++id, numericCode, name, capital, region, *altSpellings'
});

db.version(2).stores({
    units: 'c_ClaveUnidad, Nombre'
});

db.version(3).stores({
    products: 'c_ClaveProdServ, Descripción'
});

export default db;