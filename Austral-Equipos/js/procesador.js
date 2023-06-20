const direccion = 'http://192.168.135.133:3000';
let g_id_procesador = 0;

function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(direccion+'/api/procesador', requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(tabla_elementos))    
    .then(result => console.log(result))
    .catch(error => console.log('error', error))

}

function tabla_elementos(element, index, arr){
    arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>
    
        <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${element.marca_proce}
        </th>
        <td class="text-center px-6 py-4">
            ${element.modelo_proce}
        </td>
        <td class="text-center px-6 py-4">
            ${element.socket_proce}
        </td>
        <td class="text-center px-6 py-4">
            ${element.velocidad_proce}
        </td>
        <td class="text-center px-6 py-4">
            ${element.nucleo_fisico}
        </td>
        <td class=" text-center px-6 py-4">
            ${element.nucleo_logico}
        </td>
        <td class="px-6 py-4">
            <a href="actualizar_proce.html?id=${element.id_procesador}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a href="eliminar_proce.html?id=${element.id_procesador}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    </tr>`

}

function agregar(){

    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var marca_proce = document.getElementById('txt_marca_proce').value 
    var modelo_proce = document.getElementById('txt_modelo_proce').value
    var socket_proce = document.getElementById('txt_socket_proce').value
    var velocidad_proce = document.getElementById('txt_velocidad_proce').value
    var nucleo_fisico = document.getElementById('txt_nucleo_fisico').value
    var nucleo_logico = document.getElementById('txt_nucleo_logico').value

    var raw = JSON.stringify({
        'marca_proce': marca_proce,
        'modelo_proce': modelo_proce,
        'socket_proce': socket_proce,
        'velocidad_proce': velocidad_proce,
        'nucleo_fisico': nucleo_fisico,
        'nucleo_logico': nucleo_logico
    })

    var requestOptions = {
        method : 'POST',
        body: raw,
        headers: myHeaders,
        redirect : 'follow'
    }

    fetch(direccion+'/api/procesador',requestOptions)
    .then((response)=>{
        if(response.status == 200){
            document.querySelector('#mensaje_modal').innerHTML =
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
            <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#mensaje_modal').innerHTML =
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
 } 

function obtenerId(){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_procesador = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_procesador = p_id_procesador
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_procesador)
}

function obtener_datos(p_id_procesador){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
       };
       
       fetch(direccion+"/api/procesador/"+p_id_procesador, requestOptions)
         .then((response) => response.json())
         .then((json) => json.forEach(mostrarDatos))     
         .then(result => console.log(result))
         .catch(error => console.log('error', error));

}

function mostrarDatos(element){

    document.getElementById("txt_marca_proce").value = element.marca_proce;
    document.getElementById("txt_modelo_proce").value = element.modelo_proce;
    document.getElementById("txt_socket_proce").value = element.socket_proce;
    document.getElementById("txt_velocidad_proce").value = element.velocidad_proce;
    document.getElementById("txt_nucleo_fisico").value = element.nucleo_fisico;
    document.getElementById("txt_nucleo_logico").value = element.nucleo_logico;
}

function actualizar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var marca_proce = document.getElementById("txt_marca_proce").value
    var modelo_proce = document.getElementById("txt_modelo_proce").value
    var socket_proce = document.getElementById("txt_socket_proce").value
    var velocidad_proce = document.getElementById("txt_velocidad_proce").value
    var nucleo_fisico = document.getElementById("txt_nucleo_fisico").value
    var nucleo_logico = document.getElementById("txt_nucleo_logico").value

     let raw = JSON.stringify({
        'marca_proce': marca_proce,
        'modelo_proce': modelo_proce,
        'socket_proce': socket_proce,
        'velocidad_proce': velocidad_proce,
        'nucleo_fisico': nucleo_fisico,
        'nucleo_logico': nucleo_logico
     })

    var requestOptions = {
        method :'PATCH',
        headers : myHeaders,
        body : raw,
        redirect : 'follow'
    }

    fetch(direccion+'/api/procesador/'+g_id_procesador, requestOptions)
    .then ((response) => {
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML +=
            `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
                <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Aceptar
                    </button></a>                      
            `;
          }else{
            document.querySelector('#mensaje_modal').innerHTML +=
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
              <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Aceptar
                  </button></a>          
            `; 
            };
    })
}

function eliminar(){

    var requestOptions = {
        method :'DELETE',
        redirect : 'follow'
    }


    fetch(direccion+'/api/ram/'+g_id_procesador, requestOptions)
    .then (response => {
        if(response.status == 200){
        document.querySelector('#mensaje_modal').innerHTML +=
        `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
            <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>                      
        `;
      }else{
        document.querySelector('#mensaje_modal').innerHTML +=
        `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
          <a href="procesador.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>          
        `;          
    }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
