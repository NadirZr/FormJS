var icons = document.querySelectorAll('i.fas.icon-password');
var formRegister = document.forms['register'];
var formLogin = document.forms['login'];
var firstname = document.forms[0]["firstname"];
var lastname = document.forms[0]["lastname"];
var email = document.forms[0]["email"];
var password = document.forms[0]["password"];
var passwordConfirm = document.forms[0]["passwordCorfirm"];
var check = {};

var listenerFunction = {
    toggleInputType : (ev) => {
        ev.target.classList.toggle('fa-eye-slash');
        ev.target.classList.toggle('fa-eye');
        console.log(ev.target);
        var input = ev.target.parentNode.children[0];
        if(input.type == 'password'){
            input.type = 'text';
        }else{
            input.type = 'password';
        }  
    },
    checkFirstName : (ev) =>{
        var input = ev.target;
        var content = input.value.trim();
        document.getElementById('error-firstname').innerHTML = '';
      
        var error = '';
        
        if(!content){
            error= 'your first name must not be empty';
        }else if(!/^[a-zA-Z]{2,15}$/.test(content)){
            error= 'your first name is not valid';
        }
        if(error){
                check = {...check,firstname : false }
                document.getElementById('error-firstname').innerHTML = error;
                document.getElementById('error-firstname').style.display = 'block';
        }else{
            check = {...check,firstname : true }
        }
        setSubmitButton();
        //console.log(check);
    },
    checkLastName : (ev) =>{
        var input = ev.target;
        var content = input.value.trim();
        document.getElementById('error-lastname').innerHTML = '';
      
        var error = '';
        
        if(!content){
            error= 'your last name must not be empty';
        }else if(!/^[a-zA-Z]{2,15}$/.test(content)){
            error= 'your last name is not valid';
        }
        if(error){
                check = {...check,lastname : false }
                document.getElementById('error-lastname').innerHTML = error;
                document.getElementById('error-lastname').style.display = 'block';
        }else{
            check = {...check,lastname : true }
        }
        setSubmitButton();
        //console.log(check);
    },

    checkEmail : (ev) =>{
        var input = ev.target;
        var content = input.value.trim();
        document.getElementById('error-email').innerHTML = '';
        var error= '';
        if(!content){
            error= 'your email must not be empty';
        }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(content)){
            error= 'your email is not valid';
        }
        if(error){
            check = {...check,email : false }
            document.getElementById('error-email').innerHTML = error;
            document.getElementById('error-email').style.display = 'block';
        }else{
            check = {...check,email : true }
        }
        setSubmitButton()
        //console.log(check);
    },
    checkPassword : (ev) =>{
        var input = ev.target;
        var content = input.value.trim();
        document.getElementById('error-password').innerHTML = '';
        var error= '';
        if(!content){
            error= 'your password must not be empty';
        }else if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(content)){
            error= 'your password is not valid';
        }
        if(error){
            check = {...check,password : false }
            document.getElementById('error-password').innerHTML = error;
            document.getElementById('error-password').style.display = 'block';
        }else{
            check = {...check,password : true }
        }
        setSubmitButton()
        //console.log(check);
        
    },
    checkPasswordConfirm: (ev)=>{
        var input = ev.target;
        var content = input.value.trim();
        document.getElementById('error-confirm-password').innerHTML = '';
        var error= '';
        
        if(!content){
            error= 'you must confirm your password';
        }else if(content !== password.value){
            error = 'les deux mots de passe ne sont pas similaire';

        }
        if (error){
            check = {...check,passwordConfirm : false }
            
            document.getElementById('error-confirm-password').innerHTML = error;
            document.getElementById('error-confirm-password').style.display = 'block';
        }else{
            check = {...check,passwordConfirm : true }
        }
        setSubmitButton()
        //console.log(check);
    }

}

var checkFormValidity = () =>{
    var result = true; 
    if(formRegister){
        if(Object.keys(check).length === 5){
           for (const key in check) {
                const value = check[key];
                result = result && value;
                if(!result) return result;
           }
           return result;
        }
    }
    if(formLogin){
        if(Object.keys(check).length === 2){
           for (const key in check) {
                const value = check[key];
                result = result && value;
                if(!result) return result;
           }
           return result;
        }
    }
    return false;
}



var setSubmitButton = () =>{
    if(formRegister){
        if(checkFormValidity()){
            if(formRegister.elements[5]){
                formRegister.elements[5].disabled = false; 
                return;
            }
            
        }else{
            formRegister.elements[5].disabled = true;
        }

    }
    if(formLogin){
        if(checkFormValidity()){
            if(formLogin.elements[2]){
                formLogin.elements[2].disabled = false; 
                return;
            }
            
        }else{
            formLogin.elements[2].disabled = true;
        }

    }
}

var setupListeners = () => {
    
    if (firstname) {
        firstname.addEventListener('keyup', listenerFunction.checkFirstName);
    }
    
    if (lastname) {
        lastname.addEventListener('keyup', listenerFunction.checkLastName);
    }

    if(email){
        email.addEventListener('keyup', listenerFunction.checkEmail);
    }
    if(password){
        password.addEventListener('keyup',listenerFunction.checkPassword);
    }
    if(passwordConfirm){
        passwordConfirm.addEventListener('keyup',listenerFunction.checkPasswordConfirm);
    }
   // password ? password.onkeyup = listenerFunction.checkPassword : null;
    for (let index = 0; index < icons.length; index++) {
        const icon = icons[index];
        icon.addEventListener('click', listenerFunction.toggleInputType);
    }
   
}