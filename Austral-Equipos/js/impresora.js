const direccion = 'http://192.168.135.133:3000';

const puerto = 3000;
let g_id_impresora = 0;

function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(direccion+"/api/impresora", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tabla_elementos))    
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
}

function tabla_elementos(element,index, arr){
    arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>
    
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${element.marca_impre}
        </th>
        <td class="px-6 py-4">
            ${element.modelo_impre}
        </td>
        <td class="px-6 py-4">
            ${element.tipo_conexion}
        </td>
        <td class="px-6 py-4">
            ${element.numero_ip}
        </td>
        <td class="px-6 py-4">
            ${element.desc_impresora}
        </td>
        <td class="px-6 py-4">
            <a href="actualizar_impre.html?id=${element.idimpresora}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a href="eliminar_impre.html?id=${element.idimpresora}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    </tr>`
}

function agregarImpre(){

    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
    var marca_impre = document.getElementById("txt_marca").value;
    var modelo_impre = document.getElementById("txt_modelo").value;
    var tipo_conexion = document.getElementById("conexion").value;
    var numero_ip = document.getElementById("txt_ip").value;
    var desc_impresora = document.getElementById("txt_descripcion").value;

    var raw = JSON.stringify({
        "marca_impre" : marca_impre,
        "modelo_impre" : modelo_impre,
        "tipo_conexion": tipo_conexion,
        "numero_ip": numero_ip,
        "desc_impresora": desc_impresora
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(direccion+"/api/impresora", requestOptions)
    .then (response => {
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML =
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
            <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#mensaje_modal').innerHTML =
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
      })  
      .then(result => console.log(result))
     .catch(error => console.log('error', error));
}

function obtenerId (){
     // obtenemos los datos de la URL Actual
     var queryString = window.location.search;  
     // obtenemos los parámetros de la URL
     var urlParams = new URLSearchParams(queryString);
     //obtenemos el id del cliente
     var p_id_impresora = urlParams.get("id");
     // Asignamos un valor a variable global
     g_id_impresora = p_id_impresora
     //Invocamos funcion para obtener datos desde API REST
     obtener_datos(p_id_impresora)
}

function obtener_datos(p_id_impresora){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
       };
       
       fetch(direccion+"/api/impresora/"+p_id_impresora, requestOptions)
         .then((response) => response.json())
         .then((json) => json.forEach(mostrarDatos)
         )
     
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
}

function mostrarDatos(element){

    document.getElementById("txt_marca").value = element.marca_impre
    document.getElementById("txt_modelo").value= element.modelo_impre
    document.getElementById("txt_conexion").value = element.tipo_conexion
    document.getElementById("txt_numero_ip").value= element.numero_ip
    document.getElementById("txt_descripcion").value = element.desc_impresora

}

function eliminar(){
    var requestOptions ={
        method :"DELETE",
        redirect:"follow"
    }

    fetch(direccion+"/api/impresora/"+g_id_impresora, requestOptions)
    .then(response => {
        if(response.status ==200){
            document.querySelector("#mensaje_modal").innerHTML +=
        `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
            <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>                      
        `;
      }else{
        document.querySelector('#mensaje_modal').innerHTML +=
        `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
          <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>          
        `; 
        };
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function actualizarImpre(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var marca_impre = document.getElementById("txt_marca").value;
    var modelo_impre = document.getElementById("txt_modelo").value;
    var tipo_conexion = document.getElementById("conexion").value;
    var numero_ip = document.getElementById("txt_ip").value;
    var desc_impresora = document.getElementById("txt_descripcion").value;

    var raw = JSON.stringify({
        "marca_impre" : marca_impre,
        "modelo_impre" : modelo_impre,
        "tipo_conexion": tipo_conexion,
        "numero_ip": numero_ip,
        "desc_impresora": desc_impresora
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(direccion+"/api/impresora/"+g_id_impresora, requestOptions)
    .then (response => {
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML =
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron actualizados exitosamente !!!</h3>
            <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#mensaje_modal').innerHTML =
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="impresora.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
      })  
      .then(result => console.log(result))
     .catch(error => console.log('error', error));
}