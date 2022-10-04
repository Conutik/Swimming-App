document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault()
    const obj = {
        email: document.getElementById("email").value || null,
        password: document.getElementById("password").value || null
    }

    axios.post("/api/login", obj).then(data => {
        let response = data.data;
        console.log(response)
    })

    console.log(obj)
}