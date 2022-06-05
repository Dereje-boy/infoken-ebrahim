$(function () {
    renderStudent();
    $("#student-table").click(fillSidebar)
});

let theRow;

function fillSidebar(event) {
    theRow = event.target.parentElement;
    let oneStudent = theRow.childNodes;

    let firstname = oneStudent[0].innerText;
    let lastname = oneStudent[1].innerText;
    let studentID = oneStudent[2].innerText;
    let department = oneStudent[3].innerText;
    let gender = oneStudent[4].innerText;
    let dorm = oneStudent[5].innerText;
    let phoneNumber = oneStudent[6].innerText;
    let registrarID = oneStudent[7].innerText;
    let IS_ID = oneStudent[8].innerText;
    let studentPhoto = oneStudent[9].innerText;

    selectedStudent = {
        firstname, lastname, studentID, department, gender, dorm, phoneNumber, IS_ID, studentPhoto
    }

    if (lastname.toLowerCase().startsWith("firstn")) return;

    $("#firstname-edit").val(firstname)
    $("#lastname-edit").val(lastname)
    $("#studentID-edit").val(studentID)
    $("#department-edit").val(department)
    $("#gender-edit").val(gender)
    $("#dorm-edit").val(dorm)
    $("#phoneNumber-edit").val(phoneNumber)
    $("#registrarID-edit").val(registrarID)
    $("#IS_ID-edit").val(IS_ID)
    $("#studentPhoto-edit").val(studentPhoto)
}

function clearSidebar() {

    $("#firstname-edit").val("")
    $("#lastname-edit").val("")
    $("#studentID-edit").val("")
    $("#department-edit").val("")
    $("#gender-edit").val("")
    $("#dorm-edit").val("")
    $("#phoneNumber-edit").val("")
    $("#registrarID-edit").val("")
    $("#IS_ID-edit").val("")
    $("#studentPhoto-edit").val("")
}

function renderStudent(studentData) {

    $(".delete-row").remove()//deleting the already existing table rows.
    $.get("../students/getall", function (data1, status) {

        let data = studentData || data1;

        data.forEach(data => {
            let oneStudent = data;

            let tr = document.createElement('tr');
            $(tr).addClass("delete-row")

            let firstname = document.createElement('td');
            firstname.append(oneStudent.firstname)
            let lastname = document.createElement('td');
            lastname.append(oneStudent.lastname)
            let studentID = document.createElement('td');
            studentID.append(oneStudent.studentID)
            let department = document.createElement('td');
            department.append(oneStudent.department)
            let gender = document.createElement('td');
            gender.append(oneStudent.gender)
            let dorm = document.createElement('td');
            dorm.append(oneStudent.dorm)
            let phoneNumber = document.createElement('td');
            phoneNumber.append(oneStudent.phoneNumber)

            let registrarID = document.createElement('td');
            registrarID.append(oneStudent.registrarID)
            let IS_ID = document.createElement('td');
            IS_ID.append(oneStudent.IS_ID)
            let studentPhoto = document.createElement('td');
            studentPhoto.append(oneStudent.studentPhoto)

            $(tr).append(firstname, lastname, studentID, department, gender, dorm, phoneNumber,
                registrarID, IS_ID, studentPhoto)
            let table = document.querySelector("#student-table");
            $(table).append(tr);
        });
    });

}

$("#search").change(event=>{

    let searchKey = $("#search-key").val();
    let searchValue = $("#search").val();

    let data = {searchKey,searchValue}

    $.post("../students/getSome",data,(response)=>{
        console.log(response);
        renderStudent(response);
    })
})

//search students
$("#btn-search").click(()=>{
    let searchKey = $("#search-key").val();
    let searchValue = $("#search").val();

    let data = {searchKey,searchValue}

    $.post("../students/getSome",data,(response)=>{
        console.log(response);
        renderStudent(response);
    })
})

