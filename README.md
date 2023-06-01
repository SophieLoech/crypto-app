# crypto-app
Crypto APP: Aplicación de criptomonedas

PHP + JS.

Requisitos:

- Implementación de "Save Data": Permite recibir como parámetros una criptomoneda (como Bitcoin o Ethereum) y una moneda fiduciaria (como Dólar o Euro), realizar una solicitud a la  API y almacenar los datos en una base de datos.
- Implementaciónd del botón  "Get Order": Devuelve una orden o una lista de órdenes según los filtros especificados, consultando la base de datos.
- He podido desarrollar las funcionaldades que se pedíanen el frotend:
        ● Un botón para cargar los datos que llame a la función "Save Data" y permita seleccionar las monedas.
        ● Un formulario para buscar órdenes con los filtros que se consideren adecuados (por ejemplo, que devuelva las órdenes de mayor volumen), y que realice la llamada a la función "Get Order".
        ● Una tabla para mostrar los resultados devueltos por la API después de aplicar los filtros.
- Guarda losvalores en bases de datos.

COSAS A TENER EN CUENTA:
- Si no se carga los valores de los select enseguida, esperad unos segundo por que tardan en cargarse al tirar de las apis cruzadas que he usado en esta aplicación, para cargar todas as posibilidades de moneda y de cryptomonedas. Las cryptomonedas estñan cruzadas con las que se usan en los symbos en la API de Blockchain;
- No he conseguido generar la vista con los valores ya tratafos por el filtro, en la vista.
- No le he puesto  Estilos a la vista, peo de haberlo hehco, habria aprovechadp bootstrap de alguna manera o habría hecho un estilo básico con CCS optimizado.
- La estructura de las tablas est en el archivo "TABLES.SQL".

SYMBOLS MAS USADOS EN pruebas:
- https://api.blockchain.com/v3/exchange/l3/BTC-USD
- https://api.blockchain.com/v3/exchange/l3/DAI-eur

APIS/JSON USADOS;


● https://openexchangerates.org/api/currencies.json
● https://api.blockchain.com/v3/exchange/symbols
● https://api.coingecko.com/api/v3/coins/list
● https://www.coingecko.com/es/api/documentation


ARCHIVO ZIP:

CARPETA JS: archivos js.
CARPETA MODEL: clases en php.
CARPETA BBDD: estructura base de datos y archivo de cpnecxion a base de datos mysql.
CARPETA PHP: archivos de backend para tratar los datos e insertar y consultar los datOS. de bbdd.
CARPETA APIS: archivos php que tiene las llamadas a las distintas APIS.

