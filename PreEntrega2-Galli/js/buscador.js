let productos = baseDeDatos;

const formulario = document.querySelector('#formulario');
const boton =document.querySelector('#boton');

const filtrar = ()=> {
    let hayDato = 0;
    const texto = formulario.value.toLowerCase();
    for(let producto of productos){
        let nombre = producto.nombre.toLowerCase();
        
        if(nombre.indexOf(texto) !== -1 )
        {
            renderizarProductos(texto);
           hayDato=1;
        }
    }
    if(hayDato==0)
    {
        renderizarProductos(texto);
    }
}


boton.addEventListener('click',filtrar);