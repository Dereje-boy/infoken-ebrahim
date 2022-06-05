const mysql = require('mysql')
require('dotenv').config()
const jwt = require('../Routes/jwt');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

async function newAdmin(admin) {

    let firstname = admin.firstname
    let lastname = admin.lastname
    let username = admin.username
    let phoneNumber = admin.phoneNumber
    let password = admin.password

    return new Promise((resolve, reject) => {
        let sql = `insert into admins set ?`;
        intializeConnection().query(sql, {firstname, lastname, username, password, phoneNumber},
            (error, result) => {
                if (error) reject(error)
                else resolve(result);
            })
    })
}

async function getByIA_ID(IA_ID) {
    let sql = `select * from admins where IA_ID = ${IA_ID} and isGranted = true`;
    return new Promise((resolve, reject) => {

        intializeConnection().query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function updateAdmin(IA_ID, admin) {
    return new Promise((resolve, reject) => {
        let sql = prepareUpdateSQL(IA_ID, admin);
        console.log(sql);
        intializeConnection().query(sql, (error, result) => {
            if (error) reject(error);
            else resolve(result);

        })

    })
}

async function getAllAdmin() {
    return new Promise((resolve, reject) => {
        let sql = "select * from admins where isGranted = true;";
        console.log(connection._config);
        intializeConnection().query(sql, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        })
    })
}

async function getBoth() {
    return new Promise((resolve, reject) => {
        let sql = "select * from admins;";
        intializeConnection().query(sql, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        })
    })
}

async function deleteAdmin(IA_ID) {
    return new Promise((resolve, reject) => {
        let sql = `update admins set isGranted = false where IA_ID = ${IA_ID}`
        intializeConnection().query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
        connection.end();
    })
}

function getByUsernameAndPassword(username, password) {
    let sql = `select * from admins where username = '${username}' and password = '${password}'`

    return new Promise((resolve, reject) => {
        intializeConnection().query(sql, (error, result) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                resolve(result);
            }
        })
    })
}

function prepareUpdateSQL(IA_ID, admin) {
    // making table complement changes

    let update = "";

    let needComma = false;
    for (let info in admin) {
        if (admin[info]) {
            let comma = " , ";
            if (needComma) {
                update = update + comma;
            }

            let temp = `${info} = '${admin[info]}' `;
            update = update + temp;
        }
        //starting from the second comma is needed like this fir...=dere , las=....
        needComma = true;
    }
    let sql = `update admins set ${update} where IA_ID = ${IA_ID}`
    return sql;
}

function intializeConnection() {
    return mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    })
}


module.exports.newAdmin = newAdmin;
module.exports.getByIA_ID = getByIA_ID;
module.exports.getByUsernameAndPassword = getByUsernameAndPassword;
module.exports.updateAdmin = updateAdmin;
module.exports.getAllAdmin = getAllAdmin;
module.exports.getBoth = getBoth;
module.exports.deleteAdmin = deleteAdmin;