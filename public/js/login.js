document.getElementById('form1').addEventListener('submit', (e) => {

    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    fetch('/api/login', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
            email,
            password
        })

    })
        .then(r => r.json())
        .then(user => {
            console.log(user)
        })
})
