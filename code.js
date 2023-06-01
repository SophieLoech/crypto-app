function chargeCryptoValues(){

  // Esta función trata los datos de las apis ligadas, en este caso la que contiene la información de las cryptomonedas . También trata los datos relacionados.

  let cryptos=[];
  let cryptoValues=[];
  

        try {

          if(localStorage.getItem("cryptos")=== null){
                  fetch('http://localhost/codigo/apis/cryptos.php', {
                      method: 'GET',
                      credentials: "include",

                  }).then(function(response) {
                      if (response.status >= 200 && response.status < 300) {
                      return response.text()
                  }
                      throw new Error(response.statusText)
                  })
                .then(function(response) {
                      let response_json=JSON.parse(response);
                      localStorage.setItem("cryptos", JSON.stringify(response_json));
                      cryptoValues = response_json;
                })
           
                for(var i=0;i<cryptoValues.length;i++){

                  let datos=[];
                  let code=cryptoValues[i].symbol.toUpperCase();
                  let name=cryptoValues[i].name;
                  
                  datos["code"]=code;
                  datos["name"]=name;
                
                  cryptos.push(datos)
              }

          }else{
            cryptoValues = JSON.parse(localStorage.getItem("cryptos"));            
           
            for(var i=0;i<cryptoValues.length;i++){

                let datos=[];
                let code=cryptoValues[i].symbol.toUpperCase();
                let name=cryptoValues[i].name;
                
                datos["code"]=code;
                datos["name"]=name;
                
                cryptos.push(datos);
              
            }           
            
          }

          return cryptos;
        
    } catch (err) {
      console.error(err.message);
    }

}

function chargeCurrienciesValues(){
  // Esta función trata los datos de las apis ligadas, en este caso la que contiene la información de las monedas internacionañes. También trata los datos relacionados.

  let currencies_array=[];
  let currenciesValues=[];
  

        try {

          if(localStorage.getItem("currencies")=== null){
                  fetch('http://localhost/codigo/apis/currencies.php', {
                      method: 'GET',
                      credentials: "include",

                  }).then(function(response) {
                      if (response.status >= 200 && response.status < 300) {
                      return response.text()
                  }
                      throw new Error(response.statusText)
                  })
                .then(function(response) {
                      let response_json=JSON.parse(response);
                      localStorage.setItem("currencies", JSON.stringify(response_json));
                      currienciesValues = response_json;
                })
           
                for(coin in currenciesValues){
                  let datos=[];
                  let code=coin;
                  let name=currenciesValues[coin];
                
                  datos=[code,name];
                  currencies_array.push(datos);
                }
           

          }else{
            
            currenciesValues = JSON.parse(localStorage.getItem("currencies")); 

            for(coin in currenciesValues){
                  let datos=[];
                  let code=coin;
                  let name=currenciesValues[coin];
                
                  datos=[code,name];
                  currencies_array.push(datos);
            }
            
          }

          var select_currencies = document.getElementById("currencies_select");         
              for(var i = 0; i < currencies_array.length; i++) {
                    var option = currencies_array[i];
                    var election = document.createElement("option");
                    election.textContent = option[1]+" ("+option[0]+")";
                    election.value = option[0];
                    select_currencies.appendChild(election);
            }         
        
    } catch (err) {
      console.error(err.message);
    }

}



function chargeSymbolsValues(){  
  // Esta función trata los datos de las apis ligadas, en este caso la que contiene la información de los symbols. También trata los datos relacionados.
   
  let symbolsValues=[];
  let symbols_crypto=[];

  try {

    if(localStorage.getItem("symbols")=== null){
            fetch('http://localhost/codigo/apis/symbols.php', {
                method: 'GET',
                credentials: "include",

            }).then(function(response) {
                if (response.status >= 200 && response.status < 300) {
                return response.text()
            }
                throw new Error(response.statusText)
            })
          .then(function(response) {
                let response_json=JSON.parse(response);
                localStorage.setItem("symbols", JSON.stringify(response_json));
                symbolsValues = response_json;
          })
     
          for(symbol in symbolsValues){
            let datos=[];
            let code=symbol;       
            symbols_crypto.push(code[0]);
          }

    }else{
      symbolsValues = JSON.parse(localStorage.getItem("symbols")); 
      
      for(symbol in symbolsValues){
        let datos=[];
        let code=symbol.split('-');       
        symbols_crypto.push(code[0]);
      }
       
    }

    let criptomonedas=chargeCryptoValues();


    let result_cryptos=[];

    for(var i=0;i<criptomonedas.length;i++){
      if(symbols_crypto.includes(criptomonedas[i]['code'])){
        result_cryptos.push(criptomonedas[i]);
        }      
    }
    
    var select_cryptos= document.getElementById("crypto_select");         
      for(var i = 0; i < result_cryptos.length; i++) {
                    var option = result_cryptos[i];
                    var election = document.createElement("option");
                    election.textContent = option['code']+" ("+option['name']+")";
                    election.value = option['code'];
                    select_cryptos.appendChild(election);
      }

      chargeCurrienciesValues();
  
  } catch (err) {
    console.error(err.message);
  }

}

function getValue(crypto,coin){
  let url='https://api.blockchain.com/v3/exchange/l3/'+crypto+'-'+coin;
  var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET",url, false ); // false for synchronous request
    xmlHttp.send( null );

    let result=JSON.parse(xmlHttp.responseText);

    let day=new Date();
    day.setTime(day.getTime() + (6000*60*1000));
    var expires = "expires="+day.toUTCString();  
    document.cookie =  "information=" + xmlHttp.responseText + ";" + expires + ";";
   
    return result;

}

function sendInfo(info){

  // Esta función envia la información de los selects que contienen los valores a combinar, para consegir el symbol sobre el que se va 

  
      let http = new XMLHttpRequest();
      let url = './php/information.php';
      let params = "&response="+info;
      http.open('POST', url, true);


      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
              let contenido=http.responseText;
              let datos_contenido= contenido.split('-');
              let dato_id=datos_contenido[datos_contenido.length-1];
              document.getElementById('id_symbol').value=dato_id;
              console.log(http.responseText);
          }
      }
      http.send(params);


}

function getOrder(data,filter_option){ 

  // Esta función ejecuta el código que va a tratar la query de datos, que según lo que seleccione en el desplegable de los filtros. También gestionará el envio de los datos a la parte servidor con el archivo filters.php

      var body = document.getElementById('symbol-info');

      if(filter_option === 'no-value'){
          if(document.getElementById('filter-action') !='undefined'){
              document.getElementById('filter-action').textContent='';
          }
            document.getElementById('filter-action').textContent="No ha seleccionado una opción de filtrado válida. Vuelva a seleccionar y hacer click"; 
      }else{
          if(document.getElementById('filter-action') !='undefined'){
            document.getElementById('filter-action').textContent='';
          }

          let split_1=data.split(":");
          let replacement1= split_1[1].split("}");
          let replacement2=replacement1[0].replace('"', " ");
          let id=replacement2.replace('"',' ').trim();
        
          let http = new XMLHttpRequest();
          let url = './php/filters.php';
          let params = "&identificator="+id+"&option="+filter_option;
          http.open('POST', url, true);
        
        
          http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
          http.onreadystatechange = function() {
              if(http.readyState == 4 && http.status == 200) {
                  let contenido=http.responseText;
                  let datos_contenido= contenido.split('-[-]-');
                  let datos_bids=datos_contenido[datos_contenido.length-1];
                  document.getElementById('result_filter').value=datos_bids;
                  console.log(http.responseText);
              }
          }
          http.send(params);

          var resultado_filtros=document.getElementById('result_filter').value;

          generar_tabla_filtrada(resultado_filtros,"bid-info");


      }


}


function saveData(){

    var crypto=document.getElementById("crypto_select").value;
    var curriencies=document.getElementById("currencies_select").value;

  if(crypto != null && crypto != 'no-value' && curriencies != null && curriencies!= 'no-value'){

    console.log('crypto:'+crypto);
    console.log('curriencies:'+curriencies);

    let peticion=getValue(crypto,curriencies);

  if(peticion['status'] != 500){
      document.getElementById('symbol-name').textContent=peticion['symbol'];
      document.getElementById('response').value=JSON.stringify(peticion);

      var info=document.getElementById('response').value;

      generar_tabla(peticion["bids"],"bid-info");
      sendInfo(info);

  }else{
      if(document.getElementById('bid-info-table') !='undefined'){
        var body = document.getElementById('bid-info');
        body.innerHTML='';
      }
      document.getElementById('symbol-name').textContent="No hay datos que se ajusten a estos criterios";     
  }

  }else{
      alert("Tiene que ambos seleccionar los valores");
  }

}

function generar_tabla(info,element) {

  //Esta función genera la estructura de la primera tabla ligada a el botónSaveData. Crea una tabla dinámicamente, que se ajusta al resultado que se le va a a pasar desde el parámetro info. El elemento es el div o apartado al que se quiere que se ligue en la vista HTML.

    // Obtener la referencia del elemento body
    var body = document.getElementById(element);

    // Crea un elemento <table> y un elemento <tbody>
    if(document.getElementById(element+'-table') !='undefined'){
      body.innerHTML='';
    }


    var tabla   = document.createElement("table");
    tabla.setAttribute('id',element+'-table');
    var tblBody = document.createElement("tbody");

    var cabeceras = Object.keys(info[0] );
    var hilera_cabecera = document.createElement("th");

    for (var key = 0; key<cabeceras.length;key++){
        var celda_cabecera = document.createElement("td");
        var textoCabecera = document.createTextNode(cabeceras[key]);
        celda_cabecera.appendChild(textoCabecera);
        hilera_cabecera.appendChild(celda_cabecera);
    }
    tblBody.appendChild(hilera_cabecera);

    for (var i = 0; i<info.length; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");

      for(data in info[i]){       
              
              let index=info[i][data];
              var celda_data = document.createElement("td");
              var textoData = document.createTextNode(index);
              celda_data.appendChild(textoData);
              hilera.appendChild(celda_data);        
      }      
              
      tblBody.appendChild(hilera);
    }
    
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

function generar_tabla_filtrada(info_filtrada,element) {

    //Esta función genera la estructura de la primera tabla ligada a el botón Get Order, el botón que gestiona los datps ya filtrados según el filtro que el usuario especifique en el desplegable.  Crea una tabla dinámicamente, que se ajusta al resultado que se le va a a pasar desde el parámetro info. El elemento es el div o apartado al que se quiere que se ligue en la vista HTML

  console.log('construyendo la tabla filtrada');

  console.log(info_filtrada);

  // Obtener la referencia del elemento body
  var tabla = document.getElementById(element+'-table');

  // Crea un elemento <table> y un elemento <tbody>
  if(document.getElementById(element+'-table') !='undefined'){
    tabla.innerHTML="";
  }
}

function init(){

  chargeSymbolsValues();
    var saveDataButton= document.getElementById("saveData");
    saveDataButton.addEventListener("click",function(){
        saveData();
       
    });
      var getOrderButton= document.getElementById("getOrder");
      getOrderButton.addEventListener("click",function(){
          var identificator=document.getElementById('id_symbol').value;
          var selected_option=document.getElementById('filter_select').value;
          getOrder(identificator,selected_option);      
      });

}
window.onload=function(){

  setTimeout(init, 2000);

    
    


}