const studentsDatabase = require('../Databases/studentsDatabases');

async function addNewStudent(student) {
    return studentsDatabase.addNewStudent(student);
}
async function getSomeStudent(search) {
    return studentsDatabase.getSomeStudent(search);
}
async function searchStudentByID(studentID) {
    return studentsDatabase.searchStudentByID(studentID);
}
async function updateStudent(newStudent,existingStudent) {
    return studentsDatabase.updateStudent(newStudent,existingStudent);
}
async function getAllStudents() {
    return studentsDatabase.getAllStudents();
}
async function getStudentsByIS_ID(is_id) {
    return studentsDatabase.getStudentsByIS_ID(is_id);
}
async function getStudentsByFirstname(firstname) {
    return studentsDatabase.getStudentsByFirstname(firstname);
}
async function getStudentsByDepartment(department) {
    return studentsDatabase.getStudentsByDepartment(department);
}

//delete student
async function deleteStudent(IS_ID) {
    return studentsDatabase.deleteStudent(IS_ID);
}

//update student photo
async function updateStudentPhoto(photo) {
    return studentsDatabase.updateStudentPhoto(photo);
}

module.exports.addNewStudent = addNewStudent;
module.exports.getSomeStudent = getSomeStudent;
module.exports.getAllStudents = getAllStudents;
module.exports.updateStudent = updateStudent;

//searching....
module.exports.getStudentsByIS_ID = getStudentsByIS_ID;
module.exports.getStudentsByDepartment = getStudentsByDepartment;
module.exports.getStudentsByFirstname = getStudentsByFirstname;
module.exports.searchStudentByID = searchStudentByID;

//delete
module.exports.deleteStudent = deleteStudent;
//delete
module.exports.updateStudentPhoto = updateStudentPhoto;