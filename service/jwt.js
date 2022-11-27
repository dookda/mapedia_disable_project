var jwt = require('jsonwebtoken');

let generateAccessToken = (username) => {
    // '120ms' '1h'
    return jwt.sign(username, 'sakda', { expiresIn: '24h' });
}

let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, 'sakda', (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}