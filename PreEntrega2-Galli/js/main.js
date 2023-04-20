//VARIABLES GLOBALES
let user=1;
let base= Math.round(Math.random() * 1000000);//maximo de productos admitidos 1000000. este seria como su id
let codigos=0;
///////////////////////

//CLASES//////////////
class producto{
    //constructor
    constructor(nombre,stock=0 , marca="generica"){//constructor parametrizado
        this.marca=marca;
        this.nombre=nombre;
        if(isNaN(stock)==false && parseInt(stock)>=0)
        {
            this.stock=parseInt(stock);
        }else{
            this.stock=0;
        }
        this.codigo = base+codigos;
        codigos++;
        this.actualizacion = new Date();//solamente se almacena la ultima vez que se agrego stock.
    }

    imprimirConsola(){
        console.log("producto: "+this.nombre  +", Marca: "+ this.marca +", stock: "+ this.stock  +" , id: "+ this.codigo +", ultima actualizacion: "+ this.actualizacion.toLocaleString());
    }
}


///////////////////////////////////////////////
//ARRAYS//////////////
const gondola = [
    new producto ("ps5",12,"sony") , 
    new producto ("ps4",2,"sony"),
    new producto ("gameboy",6,"nintendo"),
    new producto ("notebook",2,"asus"),
    new producto ("notebook",2,"hp"),
    new producto ("joystick",10),//si no le pongo marca por defecto deberia ser "generico". eso esta definido en  el constructor
    new producto ("auriculasres",2,"jbl"),
    new producto ("parlante",2,"jbl"),
    new producto ("joystick",6,"sony"),
];

//////////////////////
/////////////////FUNCIONES/////////////////////

function error(codigoError)
{
    switch (codigoError) {
        case 1:
            console.log("ERROR EN EL INGRESO DE DATOS DE LA BUSQUEDA. \n CODIGO DE ERROR: "+1);
            break;
        case 2:
            console.log("ERROR!! NO RECONOCE EL VALOR COMO UN NUMERO. \n CODIGO DE ERROR: "+2);
            break;
        default:
            break;
    }
}

function menuOpciones(opcion)
{
    let retorno=1,modifica=0;
    let mensaje, resultado;
    switch (opcion) {
        case "stock":
            mensaje= nuevoDato("igrese el nombre o la marca del producto que quiere consultar, si desea ver todos solo igrese todos");
            if(mensaje !== "todos" && mensaje !== "todo" )
            {
                const resultado = gondola.filter( producto => producto.nombre === mensaje || producto.marca === mensaje );
                console.table(resultado); 
            
            
            }else if(mensaje == "todos" || mensaje == "todo" ){
                const resultado = gondola.filter( producto => producto.stock !== -1 );
                console.table(resultado); 
            }else{
                error(1);
            }
            break;
        case "poner":
            
             mensaje = nuevoDato("igrese el nombre o la marca del producto al que quiere agregar mercaderia");
             resultado = gondola.filter( producto => producto.nombre === mensaje || producto.marca === mensaje );
            console.table(resultado);
            if(resultado.length>1)
            {
                
                
                let marca = nuevoDato("se encontraron mas de un producto con esa carracteristica, le voy a pedir que ingrese la marca solo");
                let nombre =nuevoDato("ahora ingrese el nombre");
                resultado = gondola.findIndex( producto => producto.nombre === nombre && producto.marca === marca );
                console.table(resultado);
                
                if( isNaN(mensaje = nuevoDato("¿Cuanto desea agregar?"))==false)
                {
                    gondola[resultado].stock += parseInt(mensaje);
                    gondola[resultado].actualizacion =  new Date();
                    console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                }else{
                    error(2);
                }
            }else{
                resultado = gondola.findIndex( producto => producto.nombre === mensaje || producto.marca === mensaje );
                if( isNaN(mensaje = nuevoDato("¿Cuanto desea agregar?"))==false)
                {
                    gondola[resultado].stock += parseInt(mensaje);
                    gondola[resultado].actualizacion =  new Date();
                    console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                }else {
                    error(2);
                }
            }
            break;
        case "sacar":
             mensaje = nuevoDato("igrese el nombre o la marca del producto al que quiere sacar mercaderia");
             resultado = gondola.filter( producto => producto.nombre === mensaje || producto.marca === mensaje );
            console.table(resultado);
            if(resultado.length>1)
            {
                let marca = nuevoDato("se encontraron mas de un producto con esa carracteristica, le voy a pedir que ingrese la marca solo");
                let nombre =nuevoDato("ahora ingrese el nombre");
                resultado = gondola.findIndex( producto => producto.nombre === nombre && producto.marca === marca );
                console.table(resultado);
                
                if( isNaN(mensaje = nuevoDato("¿Cuanto desea sacar?"))==false)
                {
                    if(gondola[resultado].stock >= parseInt(mensaje))
                    {
                        gondola[resultado].stock -= parseInt(mensaje);
                        console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                    }else{
                        error(3);
                        gondola[resultado].stock = 0;
                        console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                    }
                }else{
                    error(2);
                }
            }else{
                resultado = gondola.findIndex( producto => producto.nombre === mensaje || producto.marca === mensaje );
                if( isNaN(mensaje = nuevoDato("¿Cuanto desea sacar?"))==false)
                {
                    if(gondola[resultado].stock >= parseInt(mensaje))
                    {
                        gondola[resultado].stock -= parseInt(mensaje);
                        console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                    }else{
                        error(3);
                        gondola[resultado].stock = 0;
                        console.log("nuevo valor de stock = "+ gondola[resultado].stock);
                    }
                }else {
                    error(2);
                }
            }
            
            break;
        case "terminar":
            retorno=0;
            break;
        case "ayuda":
            alert("Lista de comandos: "+ '\n' + " \"stock\" : Te dira el stock disponible " + '\n' + "\"poner\" : Para agregar \"X\" stock" + '\n' + "\"sacar\" : Para retirar cantidad \"X\" de stock" + '\n' + "\"terminar\" : Para terminar el proceso");
            break;
        default:
            //EN CASO QUE EL VALOR NO SEA VALIDO
            alert("opcion no valida, ingrese \"ayuda\" para obtener informacion de comandos");    
        break;
    }
    return retorno;
}

function nuevoDato(dato = "Ingrese Dato"){
    //RECIBIMOS LA OPERACION QUE SE DESEA REALIZAR
    let retorno = prompt(dato);
    //CONVERTIMOS EL STRING EN MINUSCULA PARA ACEPTAR PALABRAS CON MAYUSCULA SIN PROBLEMA
    retorno = retorno.toLowerCase();
    //DEVOLVEMOS LA PALABRA INGRESADA EN MINUSCULA LISTA PARA USARSE
    return retorno;
}

//////////////////////////////////////////////







//while(1){//siempre es verdadero solo salgo con un break


//FUNCION PRINCIPAL, PIDE EL DATO Y PROCESA. EL WHILE FUNCIONA DURA HASTA QUE EL USUARIO DECIDA TERMINAR
        while(user!=0)
        {
            user=menuOpciones(nuevoDato('Ingrese una operacion ("poner" "sacar" "ayuda" "terminar"'));
        }
