$(function () {
    console.log("new student is loaded successfully");
})

let newStudent = {
    firstname:$("#firstname").val(),
    lastname:$("#lastname").val(),
    studentID:$("#studentID").val(),
    department:$("#department").val(),
    gender:$("#gender").val(),
    dorm:$("#dorm").val(),
    phoneNumber:$("#phoneNumber").val(),
}

$("#btn-submit").click((event)=>{
    event.preventDefault();
    console.log("submitting the form");

    newStudent = {
        firstname:$("#firstname").val(),
        lastname:$("#lastname").val(),
        studentID:$("#studentID").val(),
        department:$("#department").val(),
        gender:$("#gender").val(),
        dorm:$("#dorm").val(),
        phoneNumber:$("#phoneNumber").val(),
    }

    console.log(newStudent);

    $.post( "",newStudent, function(data) {
        $( ".main-container" ).html( data );
        console.log("what is this");
    });
})