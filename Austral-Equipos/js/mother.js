
function listar(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(link+puerto+'/api/motherboard', requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(tabla_elementos))    
    .then(result => console.log(result))
    .catch(error => console.log('error', error))


function tabla_elementos(element, index, arr){
    arr[index] = document.getElementById("#cnt_tabla tbody").innerHTML +=
        `<tr>
    
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${element.marca_mother}
            </th>
            <td class="px-6 py-4">
                ${element.modelo_mother}
            </td>
            <td class="px-6 py-4">
                <a href="actualizar_impre.html?id=${element.id_motherboard}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="eliminar_mother.html?id=${element.id_motherboard}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
    </tr>`
    }
}

function obtenerId(){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del cliente
    var p_id_impresora = urlParams.get("id");
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
       
       fetch(link+puerto+"/api/motherboard/"+p_id_mother, requestOptions)
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

}

function actualizar(){

}

function agregar(){
    
}