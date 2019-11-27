# padron_telefonico_mexico

## Usage

```
npm i padron_telefonico_mexico
```
```js
const findPhone = require('padron_telefonico_mexico')
findPhone(5555555555)
/*{ status: true,
  messge:
   { ID: '64835',
     POBLACION: 'XOCHIMILCO',
     MUNICIPIO: 'XOCHIMILCO',
     ESTADO: 'CDMX',
     REGION: '5',
     ASL: '58',
     NIR: '55',
     SERIE: '5555',
     NUMERACION_INICIAL: '0',
     NUMERACION_FINAL: '9999',
     TIPO_RED: 'FIJO',
     RAZON_SOCIAL: 'TELEFONOS DE MEXICO, S.A.B. DE C.V.' } }*/
findPhone(0000000000)
//{ status: false, messge: 'NUMERO INVALIDO' }
```
