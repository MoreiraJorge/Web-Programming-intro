document.getElementById('form1').addEventListener('submit', (e) => {

    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    fetch('http://localhost:3000/api/login', {

        method: 'POST',
        headers: {},
        body: JSON.stringify({
            "email": email,
            "password": password
        })

    })
        .then(r => r.json())
        .then(user => {
            console.log(user)
        })
})
