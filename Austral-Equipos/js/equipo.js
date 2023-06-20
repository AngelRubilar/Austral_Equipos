const direccion = 'http://192.168.135.133:3000';
let g_id = 0;

// funciones para agregar nuevos equipos 
function cargarFunciones(){
    listado_mother();
    listado_procesador();
    listadoTipoEquipo();
    listadoEstado();
    listadoRam();   
    listadoDisco();
    listadoPuntoRed();
}
// listad  tipo de equipo para agregar en equipo
function listadoTipoEquipo(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(direccion+"/api/tipo_equipo", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tablaListadoEquipo)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
    function tablaListadoEquipo(element){
    document.querySelector('#cnt_tipo_equipo').innerHTML +=
      `<option value="${element.id_codigo_tipo}">${element.id_tipo_equipo}</option>`

}
//listado estado de equipo 
function listadoEstado(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(direccion+"/api/estado_equipo", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tablaListadoEstado)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
    function tablaListadoEstado(element){
        document.querySelector('#cnt_estado_equipo').innerHTML +=
      `<option value="${element.id_codigo_equipo}">${element.id_estado_equipo}</option>`

    }
//listado motherboard para agregar equipos
function listado_mother(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };      
    fetch(direccion+"/api/motherboard", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tabla_listado_mother)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
    function tabla_listado_mother(element){
      document.querySelector('#cnt_mother').innerHTML +=
      `<option value="${element.id_motherboard}">${element.marca_mother} ${element.modelo_mother}</option>`

}
//listado procesadores para agregar equipo
function listado_procesador(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };      
    fetch(direccion+"/api/procesador", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tabla_listado_procesador)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    function tabla_listado_procesador(element){
      document.querySelector('#cnt_proce').innerHTML +=
      `<option value="${element.id_procesador}">${element.marca_proce} ${element.modelo_proce}</option>`

}
//listado ram para agregar equipo
function listadoRam(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };      
    fetch(direccion+"/api/ram", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tablaListadoRam)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    function tablaListadoRam(element){
      document.querySelector('#cnt_ram').innerHTML +=
      `<option value="${element.id_ram}">${element.marca_ram} ${element.modelo_ram} ${element.capacidad_ram}</option>`

}
//listado discos para agregar equipo
function listadoDisco(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };      
    fetch(direccion+"/api/disco_duro", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(tablaListadoDisco)) 
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
    function tablaListadoDisco(element){
        document.querySelector('#cnt_disco').innerHTML +=
      `<option value="${element.id_disco}">${element.marca_disco} ${element.modelo_disco} ${element.capacidad}</option>`

    }
//listado de puntos de red para agregar en tabla de equipos
function listadoPuntoRed(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };      
    fetch(direccion+"/api/punto_red?_size=100", requestOptions)
       .then((response) => response.json())
       .then((json) => json.forEach(tablaListadoPuntoRed)) 
       .then(result => console.log(result))
       .catch(error => console.log('error', error));
  }
    function tablaListadoPuntoRed(element){
          document.querySelector('#cnt_punto_red').innerHTML +=
        `<option value="${element.id_numero_puntos}">Rack: ${element.rack} Patch: ${element.patch} Puerta: ${element.puerta_patch} Switch: ${element.switch} Puerta: ${element.puerta_switch}</option>`
      }



    //funcion para agregar Equipo
function agregarEquipo(){
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var nombreEquipo = document.getElementById('cnt_nombre_equipo').value; 
  var numeroIp = document.getElementById('cnt_ip_equipo').value; 
  var dominio = document.getElementById('cnt_dominio').value;
  var equipoTipo = document.getElementById('cnt_tipo_equipo').value;
  var estadoEquipo = document.getElementById('cnt_estado_equipo').value;
  var mother = document.getElementById('cnt_mother').value;
  var proce = document.getElementById('cnt_proce').value;
  var ram = document.getElementById('cnt_ram').value;
  var disco = document.getElementById('cnt_disco').value;
  var puntoRed= document.getElementById('cnt_punto_red').value;

  var raw = JSON.stringify({
    "id_nombre_equipo": nombreEquipo,
    "ip_equipo": numeroIp,
    "dominio": dominio,
    "id_codigo_tipo":equipoTipo,
    "id_codigo_equipo": estadoEquipo,
    "id_motherboard": mother,
    "id_procesador":proce,
    "id_ram": ram,
    "id_disco":disco,
    "id_numero_puntos": puntoRed
  })

  var requestOptions=({
    method :'POST',
    headers: myHeaders,
    body:raw,
    redirect: 'follow'
  })

  fetch(direccion+"/api/equipo",requestOptions)
  .then (response => {
    if(response.status == 200){
      document.querySelector('#agregar_modal').innerHTML +=
      `<img src="/img/correcto.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Felicidades, los datos fueron agregados exitosamente !!!</h3>
      <a href="equipos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Aceptar
          </button></a>       
      `;
    }else{
      document.querySelector('#agregar_modal').innerHTML +=
      `
      <img src="/img/error.png" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Lo sentimos, no es posible realizar la operación en estos momentos.</h3>
            <a href="equipos.html"><button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Aceptar
                </button></a>
      `; 
    }
  })  
     .then(result => console.log(result))
     .catch(error => console.log('error', error));  
    }
  
// listar los equipos
function listarEquipos(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "query": "select equ.id_equipo,equ.id_nombre_equipo, equ.ip_equipo, equ.dominio ,ct.id_tipo_equipo, ce.id_estado_equipo, mt.marca_mother, mt.modelo_mother ,pro.marca_proce, pro.modelo_proce, pro.socket_proce, pro.velocidad_proce, pro.nucleo_fisico, pro.nucleo_logico, ra.marca_ram, ra.modelo_ram, ra.tecnologia_ram, ra.frecuencia_ram, ra.capacidad_ram, ds.marca_disco,ds.modelo_disco, ds.capacidad, np.rack, np.patch, np.puerta_patch, np.switch, np.puerta_switch from equipo equ, tipo_equipo ct, estado_equipo ce, motherboard mt, procesador pro, ram ra, disco_duro ds, punto_red np where equ.id_codigo_tipo = ct.id_codigo_tipo and equ.id_codigo_equipo = ce.id_codigo_equipo and equ.id_motherboard = mt.id_motherboard and equ.id_procesador = pro.id_procesador and equ.id_ram = ra.id_ram and equ.id_disco = ds.id_disco and equ.id_numero_puntos = np.id_numero_puntos"
  });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };      

    fetch(direccion+"/dynamic/equipo", requestOptions)
       .then((response) => response.json())
       .then((json) => json.forEach(tablaEquipos)) 
       .then(result => console.log(result))
       .catch(error => console.log('error', error));
    }
    
    function tablaEquipos(element, index, arr){
      console.log(element)
      arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
      `<tr>        
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${element.id_nombre_equipo}
            </td>
            <td class="px-6 py-4">
                ${element.ip_equipo}
            </td>
            <td class="px-6 py-4">
                ${element.dominio}
            </td>
            <td class="flex space-x-4 mt-2">
                <a href="info_equipo.html?id=${element.id_equipo}"><svg fill="none" stroke="currentColor" stroke-width="1.5" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
              </svg></a> 
                <a href="#".html?id=${element.id_equipo}"><svg fill="none" stroke="currentColor" stroke-width="1.5" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                </svg></a>
                <a href="#.html?id=${element.id_equipo}"><svg fill="none" stroke="currentColor" stroke-width="1.5" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
               </svg></a>
            </td>
        </tr>        
        `
    }


function obtenerId(){
  // obtenemos los datos de la URL Actual
  var queryString = window.location.search;  
  // obtenemos los parámetros de la URL
  var urlParams = new URLSearchParams(queryString);
  //obtenemos el id del cliente
  var p_id_equipo = urlParams.get("id");
  // Asignamos un valor a variable global
  g_id = p_id_equipo
  //Invocamos funcion para obtener datos desde API REST
  obtenerDatos(p_id_equipo)
}

  function obtenerDatos(p_id_cliente){
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "query": "select equ.id_equipo,equ.id_nombre_equipo, equ.ip_equipo, equ.dominio ,ct.id_tipo_equipo, ce.id_estado_equipo, mt.marca_mother, mt.modelo_mother ,pro.marca_proce, pro.modelo_proce, pro.socket_proce, pro.velocidad_proce, pro.nucleo_fisico, pro.nucleo_logico, ra.marca_ram, ra.modelo_ram, ra.tecnologia_ram, ra.frecuencia_ram, ra.capacidad_ram, ds.marca_disco,ds.modelo_disco, ds.capacidad, np.rack, np.patch, np.puerta_patch, np.switch, np.puerta_switch from equipo equ, tipo_equipo ct, estado_equipo ce, motherboard mt, procesador pro, ram ra, disco_duro ds, punto_red np where equ.id_codigo_tipo = ct.id_codigo_tipo and equ.id_codigo_equipo = ce.id_codigo_equipo and equ.id_motherboard = mt.id_motherboard and equ.id_procesador = pro.id_procesador and equ.id_ram = ra.id_ram and equ.id_disco = ds.id_disco and equ.id_numero_puntos = np.id_numero_puntos"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(direccion+"/dynamic/equipo"+p_id_cliente, requestOptions)
    .then(response => response.json())
    .then((json) => json.forEach(infoEquipos))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

  function infoEquipos(element){   
    console.log(element)
    if(g_id == element.id_equipo){ 
   
    document.getElementById("cnt_numero_ip").value = element.ip_equipo;
    document.getElementById("cnt_dominio").value = element.dominio;
    document.getElementById("cnt_tipo_equipo").value = element.id_tipo_equipo;
    document.getElementById("cnt_estado_equipo").value = element.id_estado_equipo;
    document.getElementById("cnt_marca_motherboard").value = element.marca_mother;
    document.getElementById("cnt_modelo_motherboard").value = element.modelo_mother;
    document.getElementById("cnt_marca_procesador").value = element.marca_proce;
    document.getElementById("cnt_modelo_procesador").value = element.modelo_proce;
    document.getElementById("cnt_socket_procesador").value = element.socket_proce;
    document.getElementById("cnt_velocidad_procesador").value = element.velocidad_proce;
    document.getElementById("cnt_nucleo_fisico").value = element.nucleo_fisico;
    document.getElementById("cnt_nucleo_logico").value = element.nucleo_logico;
    document.getElementById("cnt_marca_ram").value = element.marca_ram;
    document.getElementById("cnt_modelo_ram").value = element.modelo_ram; 
    document.getElementById("cnt_tecnologia_ram").value = element.tecnologia_ram;
    document.getElementById("cnt_capacidad_ram").value = element.capacidad_ram;
    document.getElementById("cnt_marca_disco").value = element.marca_disco;
    document.getElementById("cnt_modelo_disco").value = element.modelo_disco;
    document.getElementById("cnt_capacidad").value = element.capacidad;
    document.getElementById("cnt_rack").value = element.rack;
    document.getElementById("cnt_patch").value = element.patch;
    document.getElementById("cnt_puerta_patch").value = element.puerta_patch; 
    document.getElementById("cnt_switch").value = element.switch;
    document.getElementById("cnt_boca_switch").value = element.puerta_switch;
  }
  }

  