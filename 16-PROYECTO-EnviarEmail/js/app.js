// var 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//variables for field
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    //went the appp run
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //form fields
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia el formulario 
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail);
}




//function 

function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// form validate
function validarFormulario(e){

    if(e.target.value.length > 0 ){

        //Elimina los errores...
        const error = document.querySelector('p.error');
        if(error){
        error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');     
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('todos los campos son obligatorios');
    }  

    if(e.target.type === 'email'){
    
    if(er.test( e.target.value ) ) {
        const error = document.querySelector('p.error');
        if(error){
        error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
       }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Email no valido');
       }
    }


    if(er.test( email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disable = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
    
}


function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center',
    'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){

     formulario.appendChild(mensajeError);   
    }

    
}

function enviarEmail(e) {
    e.preventDefault();

 //mostrar spinner
 const spinner = document.querySelector('#spinner');
 spinner.style.display = 'flex';


 //despues de tres segundos ocultar el spinner y mostrar el mensaje
 setTimeout( () => {
     spinner.style.display = 'none';
     const parrafo = document.createElement('p');
     parrafo.textContent = 'El mensaje se evio correctamente'
     parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    //inserta el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
        parrafo.remove();//Elimina el mensaje de exito

        resetearFormulario();
    }, 5000);
   }, 3000 );
 }
 //function that remove
 function resetearFormulario(){
     formulario.reset();

     iniciarApp();
 }



