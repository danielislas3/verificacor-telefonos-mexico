const db = require('./padron.json')
const jsonQuery = require('json-query')
const data = db.data


//busqueda por estado
console.log(
  jsonQuery('data[**][*ESTADO=JAL]', {data: db}).value
)