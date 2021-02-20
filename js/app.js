//VARIABLES
const shoppingCart = document.querySelector('#carrito'),
    coursesList = document.querySelector('#lista-cursos'),
    cartContainer = document.querySelector('#lista-carrito tbody'),
    cleanCart = document.querySelector('#vaciar-carrito');

let articleList = [];


cargarEventListener();

function cargarEventListener() {

    coursesList.addEventListener('click', agregarCurso)


    shoppingCart.addEventListener('click', (event) => {
        borrarCurso(event)
    })

    cleanCart.addEventListener('click', vaciarCarrito);

}



//FUNCIONS
function agregarCurso(e) {
    e.preventDefault();
    const elemento = e.target.localName;
    const padre = e.target.parentElement.parentElement;
    (elemento == 'a') ? console.log('boton agregar'): null;

    leerDatos(padre);

}

//leer datos a donde le dimos click
function leerDatos(padre) {
    console.log(padre);
    //CREAR UN OBJETO CON EL CURSO ACTUAL
    const infoCurso = {
        imagen: padre.querySelector('img').src,
        titulo: padre.querySelector('h4').textContent,
        precio: padre.querySelector('span').innerText,
        id: padre.querySelector('.agregar-carrito').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoCurso);
    //COMPROBANDO SI EXISTE EL CURSO EN EL CARRITO
    let existe = articleList.some(e => e.titulo === infoCurso.titulo)
    if (existe) {
        //SI EXISTE SE CREA UN NUEVO ARREGLO ITERANDO EL ARREGLO DEL CARRITO
        const curso = articleList.map(curso => {
                //CUANDO ENCUENTRA EL CURSO DUPLICADO, ENTOCES ACTUALIZA LA CANTIDAD DE ESE CURSO
                if (curso.titulo === infoCurso.titulo) {
                    curso.cantidad++;
                    return curso; //SE RETORNA EL OBJETO ACTUALIZADO
                } else {
                    return curso; //ESTA LINEA SE VA A EJECUTAR CUANDO AGREGEMOS UN CURSO QUE NO ESTA DUPLICADO PERO YA EXISTE OTRO DUPLICADO, POR ESO YA NO ACTUALIZAMOS LA CANTIDAD
                }
            })
            //YA QUE SE COMPROBO QUE HABIA CURSOS QUE EXISTIAN, ENTONCES SE HACE UNA COPIA DE ESE ARREGLO Y SE LE ASIGNA A NUESTRO ARREGLO PRINCIPAL DE LOS CURSOS
        articleList = [...curso]
    } else {
        //ESTA LINEA SOLO SE EJECUTA UNA VEZ O HASTA QUE NO HAYA CURSOS DUPLICADOS
        articleList = [...articleList, infoCurso]
        console.log('sin copias');
    }

    carritoHTML();
}


//muestra el carrito de compras en el html
function carritoHTML() {

    //LIMPIANDO CADA QUE SE AGREGA UN ELEMENTO
    limpiarHTML()

    //AGREGANDO ELEMENTOS AL CARRITO CON FOREACH
    articleList.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src='${imagen}' width='100'></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href='#' class="borrar-curso" data-id="${id}"> X </a></td>
        `

        //AGREGANDO EL HTML DEL CARRTIO POR CADA ELEMENTO
        cartContainer.appendChild(row);
    });
};


//LIMPIANDO EL HTML CADA QUE AGREGAS NUEVOS CURSOS PARA QUE NO SE ENSIMEN
function limpiarHTML() {
    // // FORMA LENTA
    // cartContainer.innerHTML = '';

    // //PERFORMANCE
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
}


function borrarCurso(e) {
    const element = e.target;
    let id;
    (element.localName == 'a') ? id = element.getAttribute('data-id'): null
    console.log({ id });

    //ELIMINANDO EL ELEMENTO DEL CARRITO POR EL ID
    articleList = articleList.filter(element => element.id !== id);

    // (element.classList.contains('button')) ? articleList = []: null

    //MOSTRANDO EL CARRITO ACTUALIZADO
    carritoHTML()


}

function vaciarCarrito() {
    articleList = [];
    limpiarHTML();
}