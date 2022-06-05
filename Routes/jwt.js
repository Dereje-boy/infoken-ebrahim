const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.jwtSecretKey;

function signToken(adminStringified) {
    return new Promise((resolve, reject) => {
        jwt.sign(adminStringified, secretKey, (error, token) => {
            if (error) reject(error)
            else resolve(token)
        })
    })
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, admin) => {
            if (error) reject(error)
            else {
                resolve(admin)
            }
        })
    })
}

module.exports.signToken = signToken
module.exports.verifyToken = verifyToken