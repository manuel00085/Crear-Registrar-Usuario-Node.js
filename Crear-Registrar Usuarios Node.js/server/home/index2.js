
const formC=document.querySelector('#form-create');
const formL=document.querySelector('#form-login');

const loginInput=document.querySelector('#login-input');
const createInput=document.querySelector('#create-input');

const notificacion=document.querySelector('.notification')


formC.addEventListener('submit', async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users',{method:'GET'});
    const users = await respuesta.json();
    

    //primera validacion

    const user = users.find(user=>user.username === createInput.value)

    if(!createInput.value){
        //si el campo esta vacio 

        notificacion.innerHTML= "El campo de usuario no puede estar vacio";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)


    }else if(user){
        //si existe el usuario

        notificacion.innerHTML= "el usuario ya existe"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
    }else{
        await fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:createInput.value})

        });

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification')
        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)

        createInput.value='';
    }



})

  formL.addEventListener('submit',async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users',{method:'GET'});
    const users = await respuesta.json();

    const user=users.find(user => user.username === loginInput.value)
    console.log(user)


    if(!user){
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
        createInput.value = "";



    }else{
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '../tareas/tareas.html';
    }



}) 