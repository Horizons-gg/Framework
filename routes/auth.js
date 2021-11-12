const fetch = require('node-fetch')



function LoginGet(req, res) {
    res.render('auth/login')
}
function LoginPost(req, res) {
    fetch(`${process.env.api}/user/login?email=${req.body.email}&password=${req.body.password}`)
        .then(res => res.json())
        .then(data => res.status(200).send(data.token))
        .catch(err => res.status(400).send(err))
}

function RegisterGet(req, res) {
    res.render('auth/register')
}
function RegisterPost(req, res) {
    fetch(`${process.env.api}/user/create`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            code: req.body.code
        })
    })
        .then(async response => {
            if (response.status === 200) {
                return res.status(200).send(`Activation code sent to ${req.body.email}`)
            }
            if (response.status === 201) {
                var data = await response.json()
                return res.status(201).send(data.security.token)
            }
            if (response.status === 400) {
                return res.status(400).send(await response.text())
            }
            else {
                return res.status(500).send('Something went wrong, please contact support if this issue persists.')
            }
        })
        .catch(err => console.log(err))
}



module.exports = {
    LoginGet: LoginGet,
    LoginPost: LoginPost,

    RegisterGet: RegisterGet,
    RegisterPost: RegisterPost
}