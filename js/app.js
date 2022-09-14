const form = document.querySelector('.subscribe');
const email = document.querySelector('#email');
const text = document.querySelector('.subscribe__checking');
const button = document.querySelector('.btn');

const validateEmail= (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

button.addEventListener('click',(e)=> {
    e.preventDefault();

    if(validateEmail(email.value)){
        form.classList.add('valid');
        form.classList.remove('invalid');
        text.innerHTML = 'Success! You’re on the waitlist!';
        text.style.color = "#C6FF23";
        email.style.border = "border: 1px solid #0B304B"
        email.value = '';
    }else{
        form.classList.remove('valid');
        form.classList.add('invalid');
        text.innerHTML = 'Check your email address';
        text.style.color = "#FF5977";
        button.classList.add('disabled')

        email.addEventListener('input', () => {
            if (validateEmail(email.value)) {
                form.classList.add('valid');
                form.classList.remove('invalid');
                email.style.border = "1px solid #C6FF23"
                text.innerHTML = '';
                text.style.color = "#C6FF23";
                button.classList.remove('disabled')
            } else {
                form.classList.remove('valid');
                form.classList.add('invalid');
                email.style.border = "1px solid #FF5977"
                text.innerHTML = 'Check your email address';
                text.style.color = "#FF5977";
                button.classList.add('disabled')
            }
        })
    }
})
