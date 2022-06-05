const adminsDatabases = require('../Databases/adminsDatabase')

async function newAdmin(admin) {
    return adminsDatabases.newAdmin(admin)
}

async function getByIA_ID(IA_ID) {
    return adminsDatabases.getByIA_ID(IA_ID)
}
async function updateAdmin(IA_ID,admin) {
    return adminsDatabases.updateAdmin(IA_ID,admin)
}
async function getAllAdmin() {
    return adminsDatabases.getAllAdmin()
}
async function getBoth() {
    return adminsDatabases.getBoth()
}
async function deleteAdmin(IA_ID) {
    return adminsDatabases.deleteAdmin(IA_ID)
}
async function getByUsernameAndPassword(username,password) {
    return adminsDatabases.getByUsernameAndPassword(username,password)
}

module.exports.newAdmin = newAdmin;
module.exports.getByIA_ID = getByIA_ID;
module.exports.getByUsernameAndPassword = getByUsernameAndPassword;
module.exports.updateAdmin = updateAdmin;
module.exports.getAllAdmin = getAllAdmin;
module.exports.getBoth = getBoth;
module.exports.deleteAdmin = deleteAdmin;