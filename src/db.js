import Dexie from 'dexie';

const db = new Dexie('pwa-demo');
db.version(1).stores({
    countries: '++id, numericCode, name, capital, region, *altSpellings'
});

export default db;