const direccion = 'http://192.168.135.133:3000';
let g_id_ram = 0

function listado(){

const options = {method: 'GET'};

fetch(direccion+'/api/ram', options)
.then((response) => response.json())
.then((json) => json.forEach(mostrarDatos))    
.then(result => console.log(result))
.catch(error => console.log('error', error));
};

function mostrarDatos (element, index, arr){
    arr [index] = document.querySelector('.data').innerHTML +=
    `<tr>    
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${element.marca_ram}
            </th>
            <td class="px-6 py-4">
                ${element.modelo_ram}
            </td>
            <td class="px-6 py-4">
                ${element.tecnologia_ram}
            </td>
            <td class="px-6 py-4">
                ${element.frecuencia_ram}
            </td>
        <td class="px-6 py-4">
            ${element.capacidad_ram}
        </td>
        <td class="px-6 py-4">
            <a href="actualizar_ram.html?id=${element.id_ram}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a href="eliminar_ram.html?id=${element.id_ram}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
        </td>
    
</tr>`;
}

function obtenerId(){

    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_ram = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_ram = p_id_ram
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_ram)
}

function obtener_datos(p_id_ram){

    var requestOptions = {
        method : 'GET',
        redirect :'follow'    
    };

    fetch(direccion+'/api/ram/'+p_id_ram, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(cargarDatos))
    .then ((result) => console.log(result))
    .catch(error => console.log('error', error));

    
}

function cargarDatos(element){
    console.log(element)
    document.getElementById("txt_marca_ram").value = element.marca_ram;
    document.getElementById("txt_modelo_ram").value = element.modelo_ram;
    document.getElementById("txt_tecnologia_ram").value = element.tecnologia_ram;
    document.getElementById("txt_frecuencia_ram").value = element.frecuencia_ram;
    document.getElementById("txt_capacidad_ram").value = element.capacidad_ram;

}

function eliminar(){

    var requestOptions = {
        method :'DELETE',
        redirect : 'follow'
    }


    fetch(direccion+'/api/ram/'+g_id_ram, requestOptions)
    .then (response => {
        if(response.status == 200){
        document.querySelector('#mensaje_modal').innerHTML +=
        `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
            <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>                      
        `;
      }else{
        document.querySelector('#mensaje_modal').innerHTML +=
        `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
          <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>          
        `;          
    }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function actualizar_ram(){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var marca_ram = document.getElementById("txt_marca_ram").value
        var modelo_ram = document.getElementById("txt_modelo_ram").value
        var tecnologia_ram = document.getElementById("txt_tecnologia_ram").value
        var frecuencia_ram = document.getElementById("txt_frecuencia_ram").value
        var capacidad_ram = document.getElementById("txt_capacidad_ram").value


        var raw = JSON.stringify({
            'marca_ram' : marca_ram,
            'modelo_ram' : modelo_ram,
            'tecnologia_ram' : tecnologia_ram,
            'frecuencia_ram' : frecuencia_ram,
            'capacidad_ram' : capacidad_ram
        })
        
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(direccion+'/api/ram/'+g_id_ram, requestOptions)
        .then (response => {
            if(response.status == 200){
            document.querySelector('#mensaje_modal').innerHTML +=
            `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
                <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Aceptar
                    </button></a>                      
            `;
          }else{
            document.querySelector('#mensaje_modal').innerHTML +=
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
              <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Aceptar
                  </button></a>          
            `;          
        }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function agregarRam(){

    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var marca_ram = document.getElementById("txt_marca_ram").value
    var modelo_ram = document.getElementById("txt_modelo_ram").value
    var tecnologia_ram = document.getElementById("txt_tecnologia_ram").value
    var frecuencia_ram = document.getElementById("txt_frecuencia_ram").value
    var capacidad_ram = document.getElementById("txt_capacidad_ram").value

    var raw = JSON.stringify({
        'marca_ram': marca_ram,
        'modelo_ram': modelo_ram,
        'tecnologia_ram': tecnologia_ram,
        'frecuencia_ram': frecuencia_ram,
        'capacidad_ram': capacidad_ram
    })

    var requestOptions ={
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    fetch(direccion+"/api/ram", requestOptions)
    .then (response => {
        if(response.status == 200){
            document.querySelector("#mensaje_modal").innerHTML = 
            `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
            <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
            `;
        }else{
            document.querySelector('#agregar_modal').innerHTML +=
            `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="ram.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
        }
        })
        .then(result => console.log(result))
         .catch(error => console.log('error', error));
   
}
