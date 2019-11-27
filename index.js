const db = require('./padron.json')
const jsonQuery = require('json-query')
/**
 *ESTRUCTURA DEL NUMERO (todos los numeros son de 10 digitos)
 * NIR(lada) + serie + EXTRA
 * ->NIR puede ser de 2 o 3 digitos
 * para 2 digitos (33,55,56,81)
 * para 3 digitos (2,31,32-9,4,58,59,6,7,82-9,9)
 *->SERIE  puede ser de 3 o 4 digitos 
 * si el NIR es de 2 digitos la serie es de 4
 * si el NIR es de 3 digitos la serie es de 3
 *->EXTRA son los 4 digitos restantes y debes de estar en el rango de (NUMERACION_INICIAL + NUMERACION_FINAL)
 */

function assignNIR(num) {
  num = num.toString()
  num = num.split('')
  switch (num[0]) {
    case '0':
      return 'Numero invalido'
      break
    case '1':
      return 'Numero invalido'
      break

    case '3': {
      if (num[1] == 3) return num[0] + num[1]
      return num[0] + num[1] + num[2]
    }
    break
  case '4':
    return (num[0] + num[1] + num[2])
    break
  case '5': {
    if (num[1] == 5 || num[1] == 6) return num[0] + num[1]
    return num[0] + num[1] + num[2]
  }
  break
  case '8': {
    if (num[1] == 0) return 'Numero invalido'
    if (num[1] == 1) return num[0] + num[1]
    return num[0] + num[1] + num[2]
  }
  break
  default:
    return (num[0] + num[1] + num[2])
  }

}

function assignSERIE(num) {
  let originalNum = num
  num = num.toString()
  num = num.split('')
  if ((assignNIR(originalNum).length) == 2) return num[2] + num[3] + num[4] + num[5]
  if ((assignNIR(originalNum).length) == 3) return num[2] + num[3] + num[4]
}

function assingEXTRA(num) {
  num = num.toString()
  num = num.split('')
  return num[6] + num[7] + num[8] + num[9]
}
/**
 * @param {String} num - The phone number
 * 
 */
function find(phone) {
  num = phone.toString()
  if (num.length != 10) return ({status:false, messge:'NUMERO INVALIDO'})
  const nir = assignNIR(num)
  const serie = assignSERIE(num)
  const extra = assingEXTRA(num)

  const nirs = {
    data: jsonQuery(`data[**][*NIR=${nir}]`, {
      data: db
    }).value
  }

  const series = jsonQuery(`data[**][*SERIE=${serie}]`, {
    data: nirs
  }).value

  if (series[0]) {
    if (extra > series[0]['NUMERACION_INICIAL'] && extra < series[0]['NUMERACION_FINAL']) {
      return ({status:true, messge:series[0]})
    } else {
      return ({status:false, messge:'No se encontraron registros [NUM FINAL]'})
    }
  } else {
    return ({status:false, messge:'SERIE y/o NIRS invalidos'})
  }
}
console.log(find(5727763542))