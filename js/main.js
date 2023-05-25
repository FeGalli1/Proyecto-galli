let baseDeDatos; // Movido dentro del bloque fetch
fetch('./json/productos.json')
  .then(response => response.json())
  .then(data => {
    // Aquí se almacenan los datos en un array de objetos
    baseDeDatos = data.productos.map(producto => {
      return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        descripcion: producto.descripcion // Corregido
      };
    });
//renderizo los dato una vez terminado de obtenerlos del json
    renderizarProductos();
  })
  .catch(error => {
    console.log('Error:', error);
  });

    //Array del carrito que empieza vacio
    let carrito = [];
    //la divisa que usaremos, tambien debe cambiarse en el html para mostrar (dollar o euro)
    const divisa = '$';
    //Buscamos los id y los guardamos
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones


    
    

    //Esta funcion muestra los productos a partir de la palabra que se haya ingresado, de no ingresar nada se mostrara todo.
    function renderizarProductos(palabraClave) {
        const listaProductos = document.getElementById("items");

        
        // Vaciar contenido del elemento HTML de esta manera cada vez que la funcion se llame se limpie lo anterior y no se vaya acumulando
        listaProductos.innerHTML = "";

        
        //busca por todo el array si encuentra coicidencia con la palabra clave
          const productosFiltrados = buscarProductos(palabraClave);
          
          productosFiltrados.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('col', 'card-container');



          const miNodo1 =document.createElement('div');
          miNodo1.classList.add('card', 'shadow');
          miNodo1.addEventListener('click',flip)
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
      
          miNodoImagen.setAttribute('src', info.imagen);
      
          // Body
          const miNodoFront =document.createElement('div');
          miNodoFront.classList.add('front','card-body');
          const miNodoBack =document.createElement('div');
          miNodoBack.classList.add('back','card-body');

          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          const miNodoDescripcion = document.createElement('p');
          miNodoDescripcion.textContent = info.descripcion;

          const miNodoSeccionBoton = document.createElement('div');
          miNodoSeccionBoton.classList.add('bottom-section');

          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          const miNodoPrecio = document.createElement('h6');
          miNodoPrecio.textContent = info.precio + divisa;

            miNodoFront.appendChild(miNodoImagen);
            miNodoBack.appendChild(miNodoTitle);
            miNodoBack.appendChild(miNodoDescripcion);
            miNodoSeccionBoton.appendChild(miNodoPrecio);
            miNodoSeccionBoton.appendChild(miNodoBoton);
        //    miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoBack.appendChild(miNodoSeccionBoton);
            miNodo.appendChild(miNodo1);
            miNodo1.appendChild(miNodoFront);
            miNodo1.appendChild(miNodoBack);
            DOMitems.appendChild(miNodo);
        });
    }

    //Evento para añadir un producto al carrito de la compra
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    
    //Dibuja todos los productos guardados en el carrito
    
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-8');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-8');
            miBoton.textContent = 'X';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    
    // Evento para borrar un elemento del carrito
    
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }


     // Calcula el precio total teniendo en cuenta los productos repetidos
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    
    // Varia el carrito y vuelve a dibujarlo
    
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    //guardamos el carrito en caso de que se recargue la pagina
    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    //vemos si existe algo en mi storage y lo cargo en mi carrito nuevamente
    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

        //esta fucnion busca en la base de datos la palabra clave, si no recibe nada es que se ejecuto por primera vez o con el bucador vacio y devolvemos todos los productos
   
// Definición de buscarProductos antes de utilizarlo en el evento
function buscarProductos(criterio) {
    if (!criterio) {
      // Si no hay criterio de búsqueda, devolvemos el array original
      return baseDeDatos;
    } else {
      // Convertimos el criterio a minúsculas para comparar sin importar las mayúsculas
      const criterioMinusculas = criterio.toLowerCase();
      // Filtramos los elementos del array que contengan el criterio de búsqueda
      const resultadoBusqueda = baseDeDatos.filter((producto) => {
        return (
          producto.nombre.toLowerCase().includes(criterioMinusculas) ||
          (producto.descripcion &&
            producto.descripcion.toLowerCase().includes(criterioMinusculas))
        );
      });
      return resultadoBusqueda;
    }

}

//Buscador 
const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');

const filtrar = () => {
  let hayDato = 0;
  const texto = formulario.value.toLowerCase();
  for (let producto of baseDeDatos) { // Reemplazado 'productos' por 'baseDeDatos'
    let nombre = producto.nombre.toLowerCase();
    let descripcion = producto.descripcion.toLowerCase();
    if (nombre.indexOf(texto) !== -1 || descripcion.indexOf(texto) !== -1) {
      renderizarProductos(texto);
      hayDato = 1;
    }
  }
  if (hayDato == 0) {
    renderizarProductos('');
  }
}

// Variable global para controlar si se está reproduciendo la animación
let playing = false;

// Función para voltear la tarjeta
function flip() {
    if (playing) return;
    playing = true;
    anime({
        targets: this, 
        scale: [{ value: 1 }, { value: 1.3 }, { value: 1, delay: 250 }],
        rotateY: { value: "+=180", delay: 200 },
        easing: "easeInOutSine",
        duration: 400,
        complete: function(anim) {
            playing = false;
        }
    });
}


    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    boton.addEventListener('click', filtrar);

    // Inicio
    
    cargarCarritoDeLocalStorage();
    renderizarCarrito();


