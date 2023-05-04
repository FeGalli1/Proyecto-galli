    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pexels Steve Johnson',
            precio: 15000,
            imagen: 'Cuadros/pexels-steve-johnson.jpg',
            descripcon: 'Arte moderno virtual. Esta obra fue publicada el 9 de agosto del 2021 por Steve Johnson en "pexels". Fue diseñada virtualmente con el software "Adobe Photoshop". '
        },
        {
            id: 2,
            nombre: 'Costa En Santa Cristina',
            precio: 94000,
            imagen: 'Cuadros/COSTA EN SANTA CRISTINA.jpg',
            descripcon: 'Una obra del autor "Joaquin Sorolla Y Bastida" y fue hecha en el año 1914. Esta hecha con la tecnica de óleo sobre lienzo y tiene una dimension de 99x74 cm'
        },
    
        {
            id: 3,
            nombre: 'Tintas Tintas y Tintas',
            precio: 10000,
            imagen: 'Cuadros/Tintas-tintas-y-tintas.jpg',
            descripcon: 'Una obra de la autora "Luchi Sanguinetti". El color y la forma prevalecen en mi visión. Aparece reiteradamente formas percibidas en el pasado, las cuales han dejado huella en mi memoria. Hay trazo que se repite y la lectura es múltiple. Realidades con diversas percepciones.'
        },
        {
            id: 4,
            nombre: 'On The Road From Moret',
            precio: 11000,
            imagen: 'Cuadros/Alfred Sisley On the Road from Moret.jpg',
            descripcon: 'Una obra del autor "Alfred Sisley" y fue hecha en el año 1882.El dibujo lleva una inscripción que identifica el lugar como el camino de Moret a Sainte-Mammès. Tiene un tamaño de 54 x 73 cm'
            
        }       
    ];

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
          miNodo.classList.add('col','card', 'shadow-ms');
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
      
          miNodoImagen.setAttribute('src', info.imagen);
      
          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
      
          // Precio
          const miNodoDescripcion = document.createElement('p');
          miNodoDescripcion.classList.add('card-text');
          miNodoDescripcion.textContent = `${info.descripcon}`;
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          const miNodoPrecio = document.createElement('p');
         
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
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
              (producto.descripcon &&
                producto.descripcon.toLowerCase().includes(criterioMinusculas))
            );
          });
          return resultadoBusqueda;
        }
      }
      
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
