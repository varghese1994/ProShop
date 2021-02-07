const bcrypt = require('bcryptjs')

const users = [
    {
        name:'Admin',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name:'Stark',
        email:'stark@example.com',
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:'Cap',
        email:'cap@example.com',
        password:bcrypt.hashSync('123456',10)
    }
]
module.exports = users