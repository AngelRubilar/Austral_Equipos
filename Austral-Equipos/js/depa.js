const puerto = 3000
let g_id_departamento = 0

// listar anexos desde base de datos
function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://147.182.212.216:"+puerto+"/api/departamento", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tabla_elementos))    
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

// funcion para agregar los valores de la base de datos
function tabla_elementos (element, index, arr){
    arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>
    
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${element.codigo_depto}
        </th>
        <td class="px-6 py-4">
            ${element.nombre_depto}
        </td>
        <td class="px-6 py-4">
            <a href="actualizar_depto.html?id=${element.iddepto}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a href="delete_depto.html?id=${element.iddepto}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    </tr>`
}


// funcion para agregar departamentos
function AgregarDepto(){

    var myHeaders= new Headers();
    myHeaders.append("Content-Type","application/json");

    var codigo = document.getElementById('txt_codigo').value; 
    var nombreDepto = document.getElementById('txt_nombre_depto').value;

    var raw = JSON.stringify({
        "codigo_depto" : codigo,
        "nombre_depto" : nombreDepto
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://147.182.212.216:"+puerto+"/api/departamento", requestOptions)
      .then(response =>{
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML =
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
            <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#agregar_modal').innerHTML +=
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
      })  
      .then(result => console.log(result))
     .catch(error => console.log('error', error));
};

// funcion para obtener el id desde la url
function obtenerId(){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_departamento = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_departamento = p_id_departamento
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_departamento)

}


function obtener_datos(p_id_departamento){
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
   };
   
   fetch("http://147.182.212.216:"+puerto+"/api/departamento/"+p_id_departamento, requestOptions)
     .then((response) => response.json())
     .then((json) => json.forEach(mostrarDatos)
     )
 
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
 };

function mostrarDatos(element){
    
    document.getElementById("txt_codigo").value = element.codigo_depto
    document.getElementById("txt_nombre_depto").value= element.nombre_depto
}

function eliminar(){
    var requestOptions ={
        method : 'DELETE',
        redirect:'follow'
      }
   
    fetch("http://147.182.212.216:"+puerto+"/api/departamento/"+g_id_departamento, requestOptions)
    .then (response => {
        if(response.status == 200){
        document.querySelector("#mensaje_modal").innerHTML +=
        `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
            <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>                      
        `;
      }else{
        document.querySelector('#mensaje_modal').innerHTML +=
        `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
          <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>          
        `;          
      };
    })

    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
}

function actualizarDatos(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var codigo = document.getElementById("txt_codigo").value;
    var nombreDepto = document.getElementById("txt_nombre_depto").value;

    var raw = JSON.stringify({
        "codigo_depto" : codigo,
        "nombre_depto" : nombreDepto
    })

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://147.182.212.216:"+puerto+"/api/departamento/"+g_id_departamento, requestOptions)
      .then(response =>{    
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML =
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
            <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#mensaje_modal').innerHTML +=
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="departamento.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
      })  
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}