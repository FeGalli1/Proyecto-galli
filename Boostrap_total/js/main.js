//VARIABLES GLOBALES
let stock=40,modifica=0,user=1;


function menu_Opciones(opcion)
{
    let retorno=1;

    switch (opcion) {
        case "stock":
            alert("Hay un stock de: "+stock);
            break;
        case "poner":
            modifica = prompt('Cuanto deseas poner?');
            //CHEQUE QUE SOLO SE INGRESO UN NUMERO
            if(isNaN(modifica)==false && parseInt(modifica)>=0)
            {
                //CONVIERTO EL NUMERO A INT Y LO SUMO AL STOCK
                stock += parseInt(modifica);
                alert("Hay un stock de: "+stock);
            }else{
                alert("El valor ingresado no fue valido");
                //MANDO EL ERROR POR CONSOLA PARA HACER SEGUIMIENTO
                console.log("Se ingreso erroneamente "+ modifica);
            }
            break;
        case "sacar":
            modifica = prompt('Cuanto deseas sacar?');
            //CHEQUE QUE SOLO SE INGRESO UN NUMERO
            if(isNaN(modifica)==false && parseInt(modifica)>=0)
            {
                //CONVIERTO EL NUMERO A INT Y VERIFICO QUE NO SEA MAYOR AL STOCK
                //SI ES MAYOR NO SE PUEDE RESTAR Y SE DEVUELVE ERROR Y LA CANTIDAD DE STOCK QUE HAY PARA QUE LA PROXIMA RESTE MENOS
                if(stock < parseInt(modifica))
                {
                    alert("No hay stock suficiente para restar eso. El stock es de "+stock);
                    break;
                }else{
                    //SI SE PUEDE RESTAR SIN PROBLEMA LO HACE Y DEVUELVE CUANTO QUEDO
                    stock -= parseInt(modifica);
                    alert("Hay un stock de: "+stock);
                }
            }else{
                alert("El valor ingresado no fue valido");
                console.log("Se ingreso erroneamente "+ modifica);
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

function nuevo_dato(){
    //RECIBIMOS LA OPERACION QUE SE DESEA REALIZAR
    let retonro = prompt('Ingrese una operacion');
    //CONVERTIMOS EL STRING EN MINUSCULA PARA ACEPTAR PALABRAS CON MAYUSCULA SIN PROBLEMA
    retonro = retonro.toLowerCase();
    //DEVOLVEMOS LA PALABRA INGRESADA EN MINUSCULA LISTA PARA USARSE
    return retonro;
}



//FUNCION PRINCIPAL, PIDE EL DATO Y PROCESA. EL WHILE FUNCIONA DURA HASTA QUE EL USUARIO DECIDA TERMINAR
while(user!=0)
{
    user=menu_Opciones(nuevo_dato());
}