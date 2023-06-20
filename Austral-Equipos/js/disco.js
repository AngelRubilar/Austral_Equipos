
const direccion = 'http://192.168.135.133:3000';
var g_id_disco = 0;

function listar (){
    var requestOptions= {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(direccion+"/api/disco_duro", requestOptions)
    .then((response) => response.json())
    .then((json) =>json.forEach(tabla_elementos))
    .then(result => console.log(result))
    .then(error => console.log('error', error))
}

function tabla_elementos(element, index, arr){
    arr[index] =document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>    
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${element.marca_disco}
        </th>
        <td class="px-6 py-4">
            ${element.modelo_disco}
        </td>
        <td class="px-6 py-4">
            ${element.capacidad}
        </td>
        <td class="px-6 py-4">
            <a href="actualizar_disco.html?id=${element.id_disco}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a href="eliminar_disco.html?id=${element.id_disco}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    </tr>`
}

function agregar(){
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var marca_disco = document.getElementById("txt_marca_disco").value
    var modelo_disco = document.getElementById("txt_modelo_disco").value
    var capacidad = document.getElementById("txt_capacidad").value

    var raw = JSON.stringify({
        'marca_disco': marca_disco,
        'modelo_disco': modelo_disco,
        'capacidad': capacidad
    })

    var requestOptions = {
        method : 'POST',
        headers : myHeaders,
        body: raw,
        redirect: 'follow'
    }

    fetch(direccion+"/api/disco_duro", requestOptions)
    .then((response) => {
        if (response.status == 200){
            document.querySelector('#mensaje_modal').innerHTML =
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

function obtenerId(){
    var queryString = window.location.search;
    var urlParams= new URLSearchParams(queryString);
    var p_id_disco = urlParams.get("id");
    g_id_disco = p_id_disco
    obtener_datos(p_id_disco)
}

function obtener_datos(p_id_disco){
    var requestOptions = {
        method: 'GET',
        redirect : 'follow'
    }

    fetch(direccion+"/api/disco_duro"+p_id_disco, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(mostrarDatos))
    .then(result = console.log(result))
    .then(error => console.log('error', error));
}

function mostrarDatos (element){
    document.getElementById("txt_marca_disco").value= element.marca_disco
    document.getElementById("txt_modelo_disco").value = element.modelo_disco
    document.getElementById("txt_capacidad").value = element.capacidad
}

function actualizar(){
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json');

    var marca_disco = document.getElementById("txt_marca_disco").value
    var modelo_disco = document.getElementById("txt_modelo_disco").value
    var capacidad = document.getElementById("txt_capacidad").value

    var raw = JSON.stringify({
        'marca_disco': marca_disco,
        'modelo_disco': modelo_disco,
        'capacidad': capacidad
    })

    var requestOptions = {
        method : 'PATCH',
        headers : myHeaders,
        body: raw,
        redirect: 'follow'
        }

    fetch (direccion+"/api/discoduro/"+g_id_disco, requestOptions)
    .then((response) => {
        if (response.status == 200){
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
}

function eliminar (){
    var requestOptions = {
        method : 'DELETE',
        redirect : 'follow'
    }

    fetch(direccion+"/api/disco_duro"+g_id_disco, requestOptions)
    .then (response => {
        if(response.status == 200){
        document.querySelector('#mensaje_modal').innerHTML +=
        `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
            <a href="disco.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>                      
        `;
      }else{
        document.querySelector('#mensaje_modal').innerHTML +=
        `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
          <a href="disco.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>          
        `;          
    }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


    
