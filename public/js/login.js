document.getElementById('form1').addEventListener('submit', (e) => {

    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })

    })
        .then(r => r.json())
        .then(user => {
            console.log(user)

            if(user.role === "ADM"){
               //redirect a pagina ejs com o user 
            }
        })
})