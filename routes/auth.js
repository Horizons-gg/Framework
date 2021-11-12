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

}



module.exports = {
    LoginGet: LoginGet,
    LoginPost: LoginPost,

    RegisterGet: RegisterGet,
    RegisterPost: RegisterPost
}