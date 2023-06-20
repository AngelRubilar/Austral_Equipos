
const direccion = 'http://192.168.135.133:3000';
let g_id_anexo=0;
// listar anexos desde base de datos
function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(direccion+"/api/anexos?_size=80", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tabla_elementos))    
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function tabla_elementos (element, index, arr){
  console.log (element)
    arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>
    
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${element.marca_anexo}
        </th>
        <td class="px-6 py-4">
            ${element.modelo_anexo}
        </td>
        <td class="px-6 py-4">
            ${element.n_serie}
        </td>
        <td class="px-6 py-4">
            ${element.ipanexos}
        </td>
        <td class="px-6 py-4">
            ${element.numero_anexo}
        </td>
        <td class="px-6 py-4">
            <a href="editar_anexo.html?id=${element.idanexos}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" >Edit</a>
            <a href="Delete-anexo.html?id=${element.idanexos}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    </tr>`
}
// botenemos los datos desde la url 
function obtenerId(){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_cliente = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_anexo = p_id_cliente
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_cliente)
  };

  function obtener_datos(p_id_cliente){
         var requestOptions = {
         method: 'GET',
         redirect: 'follow'
        };
        
        fetch(direccion+"/api/anexos/"+p_id_cliente, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatos)
          )
      
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };

function mostrarDatos(element){
    var marca= element.marca_anexo;
    var modelo= element.modelo_anexo;
    var numeroserie = element.n_serie;
    var ipanexos= element.ipanexos;
    var numero_anexo= element.numero_anexo;

    document.getElementById('txt_marca').value = element.marca_anexo
    document.getElementById('txt_modelo').value = element.modelo_anexo
    document.getElementById('txt_nserie').value = element.n_serie
    document.getElementById('txt_ip').value = element.ipanexos
    document.getElementById('txt_anexo').value = element.numero_anexo

}

function actualizarDatos (){
    //otener los datos desde el html

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var marca = document.getElementById('txt_marca').value;
    var modelo = document.getElementById('txt_modelo').value;
    var numeroserie = document.getElementById('txt_nserie').value;
    var ipanexos = document.getElementById('txt_ip').value;
    var numero_anexo = document.getElementById('txt_anexo').value;

    var raw = JSON.stringify({
        "marca_anexo" : marca,
        "modelo_anexo":modelo,
        "n_serie":numeroserie,
        "ipanexos":ipanexos,
        "numero_anexo":numero_anexo
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      

      fetch(direccion+"/api/anexos/"+g_id_anexo, requestOptions)
      .then(response => {
        if(response.status == 200){  
          document.querySelector('#mensaje_modal').innerHTML +=
          `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
              <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Aceptar
                  </button></a>                      
          `;
 
        }else{
          document.querySelector('.mensaje-_modal').innerHTML +=
          `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>          
          `;          
        };
    })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

function eliminar(){
  var requestOptions ={
    method : 'DELETE',
    redirect:'follow'
  }

  fetch(direccion+"/api/anexos/"+g_id_anexo, requestOptions)
  .then(response => {
    if (response.status == 200){
      document.querySelector('#mensaje_modal').innerHTML +=
      `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron eliminados exitosamente !!!</h3>
      <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Aceptar
          </button></a>       
      `;
    }else{
      document.querySelector('#mensaje_modal').innerHTML +=
      ` 
          <img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a> 
      `;
    };
  })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
};

function agregar(){
  //crear el headders para pasar a json
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var marca = document.getElementById('txt_marca').value;
  var modelo = document.getElementById('txt_modelo').value;
  var numeroserie = document.getElementById('txt_nserie').value;
  var ipanexos = document.getElementById('txt_ip').value;
  var numero_anexo = document.getElementById('txt_anexo').value; 

  var raw = JSON.stringify({
     "marca_anexo" : marca,
     "modelo_anexo": modelo,
     "n_serie": numeroserie,
     "ipanexos":ipanexos,
     "numero_anexo": numero_anexo,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
 
  fetch(direccion+"/api/anexos", requestOptions)
  .then(response => {
    if(response.status == 200 ){
      document.querySelector('#agregar_modal').innerHTML=
      `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
      <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Aceptar
          </button></a> 
      
      `;
    }else{
      document.querySelector('#agregar_modal').innerHTML +=
      `
      <img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="Anexos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
    }
  })
  
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
};