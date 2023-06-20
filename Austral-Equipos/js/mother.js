const direccion = 'http://192.168.135.133:3000';
let g_id_mother = 0;

function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(direccion+'/api/motherboard', requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(tabla_elementos))    
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  }

function tabla_elementos(element, index, arr){
  console.log(element)
    arr[index] = document.querySelector("#cnt_tabla tbody").innerHTML +=
        `<tr>    
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${element.marca_mother}
            </th>
            <td class="px-6 py-4">
                ${element.modelo_mother}
            </td>
            <td class="px-6 py-4">
                <a href="actualizar_mother.html?id=${element.id_motherboard}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="eliminar_mother.html?id=${element.id_motherboard}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
    </tr>`
    }


function obtenerId(){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_mother = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_mother = p_id_mother
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_mother)
}

function obtener_datos(p_id_mother){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
       };
       
       fetch(direccion+"/api/motherboard/"+p_id_mother, requestOptions)
         .then((response) => response.json())
         .then((json) => json.forEach(mostrarDatos))     
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
}

function mostrarDatos(element){
    document.getElementById("txt_marca_mother").value = element.marca_mother;
    document.getElementById("txt_modelo_mother").value = element.modelo_mother;
}

function eliminar(){
    var requestOptions ={
        method : 'DELETE',
        redirect:'follow'
      }
    
      fetch(direccion+"/api/motherboard/"+g_id_mother, requestOptions)
      .then(response => {
        if (response.status == 200){
          document.querySelector('#mensaje_modal').innerHTML +=
          `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron eliminados exitosamente !!!</h3>
          <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Aceptar
              </button></a>       
          `;
        }else{
          document.querySelector('#mensaje_modal').innerHTML +=
          ` 
              <img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
                <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Aceptar
                    </button></a> 
          `;
        };
      })
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
}

function actualizar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var marca_mother = document.getElementById('txt_marca_mother').value
    var modelo_mother = document.getElementById('txt_marca_mother').value

    var raw = JSON.stringify({
        "marca_mother": marca_mother,
        "modelo_mother": modelo_mother
    })

    var requestOptions = {
        method : 'PATCH',
        headers : myHeaders,
        body: raw,
        redirect : 'follow'
    }

    fetch(direccion+"/api/motherboard/"+g_id_mother, requestOptions)
    .then ((response) =>{
        if (response.status == 200){
            document.querySelector('#mensaje_modal').innerHTML +=
          `  <img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los cambios fueron realizados exitosamente !!!</h3>
              <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Aceptar
                  </button></a>                      
          `;
 
        }else{
          document.querySelector('.mensaje-_modal').innerHTML +=
          `<img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>          
          `; 
        }
    })
}

function agregar(){
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var marca = document.getElementById('txt_marca').value;
  var modelo = document.getElementById('txt_modelo').value;
   

  var raw = JSON.stringify({
     "marca_mother" : marca,
     "modelo_mother": modelo,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
 
  fetch(direccion+"/api/motherboard", requestOptions)
  .then(response => {
    if(response.status == 200 ){
      document.querySelector('#agregar_modal').innerHTML=
      `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
      <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Aceptar
          </button></a>       
      `;
    }else{
      document.querySelector('#agregar_modal').innerHTML +=
      `
      <img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="mother.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
    }
  })
  
     .then(result => console.log(result))
     .catch(error => console.log('error', error));    
}