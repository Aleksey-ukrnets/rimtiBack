const form = document.querySelector('.subscribe');
const email = document.querySelector('#email');
const text = document.querySelector('.subscribe__checking');
const button = document.querySelector('.btn');

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

button.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateEmail(email.value)) {
        form.classList.add('valid');
        form.classList.remove('invalid');


        const
            token = "tfp_CBLDQjShKZM8VSZaTMWqDB6VMvL7w3Y8C3kebKWj9CC8_3spqGWJan4RQUG",
            formKey = "zxxER2SK",
            myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        // myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        // myHeaders.append("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        // myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append("Authorization", "Bearer tfp_CBLDQjShKZM8VSZaTMWqDB6VMvL7w3Y8C3kebKWj9CC8_3spqGWJan4RQUG");
        // myHeaders.append("Cookie", "AWSALBTG=IMbb8H6h5Oh96DogpzPAk02xAZ8eqZM6E2FTFBI/LZncXDt2iAuyVJwlBOFUZqhWNurlI4QZbiOENf6AWemhRGeAphBHi2Qbo7EpfSiYAdCAoToH5DS4pPIjiXLGaE8taNTG2sSzdFiuNxp0J9O3NWgK1k2xwVMIZYLhYoLMHOIn; AWSALBTGCORS=IMbb8H6h5Oh96DogpzPAk02xAZ8eqZM6E2FTFBI/LZncXDt2iAuyVJwlBOFUZqhWNurlI4QZbiOENf6AWemhRGeAphBHi2Qbo7EpfSiYAdCAoToH5DS4pPIjiXLGaE8taNTG2sSzdFiuNxp0J9O3NWgK1k2xwVMIZYLhYoLMHOIn");

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.typeform.com/forms/zxxER2SK", requestOptions)
            .then(response => response)
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        text.innerHTML = 'Success! You’re on the waitlist!';
        text.style.color = "#C6FF23";
        email.style.border = "border: 1px solid #0B304B"
        email.value = '';
    } else {
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
