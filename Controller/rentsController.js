const rentsDatabases = require('../Databases/rentsDatabases');

async function newRent(IS_ID,IB_ID) {
    return rentsDatabases.newRent(IS_ID,IB_ID);
}

async function returnBookbyIR_ID(IR_ID){
    return rentsDatabases.returBookbyIR_ID(IR_ID);
}
async function getAllRents(){
    return rentsDatabases.getAllRents();
}
async function getBoth(){
    return rentsDatabases.getBoth();
}
async function getByIR_ID(IR_ID){
    return rentsDatabases.getByIR_ID(IR_ID);
}

module.exports.newRent = newRent
module.exports.returBookbyIR_ID = returnBookbyIR_ID
module.exports.getAllRents = getAllRents
module.exports.getBoth = getBoth
module.exports.getByIR_ID = getByIR_ID