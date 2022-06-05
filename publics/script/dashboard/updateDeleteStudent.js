let Delete = false;
let Update = false;

$("#btnDelete").click(function (event) {
    if (!selectedStudent) {
        console.log("please select a student you want to delete first");
    } else {
        if (Delete === true) {
            $.post("../students/delete", selectedStudent, function (message) {
                Delete = false;
                $("#btnDelete").text("Delete")

                if (message.affectedRows === 1) {
                    console.log(selectedStudent.firstname + " " + selectedStudent.lastname + " is deleted.")
                    renderStudent();
                    clearSidebar();
                }
            })
            console.log("student deleted double click delete button to delete a student");
        } else {
            Delete = true;
            console.log("now you are ready to delete");
            $("#btnDelete").text("Delete ?")
        }
    }
})

$("#btnUpdate").click(function () {

        if (selectedStudent === null || selectedStudent === undefined
            || theRow === undefined || theRow === null) {
            console.log("Please select the student you want update");
            return;
        }
        if (Update === true) {
            let theStudent = {
                newFirstname: $("#firstname-edit").val(),
                newLastname: $("#lastname-edit").val(),
                newStudentID: $("#studentID-edit").val(),
                newDepartment: $("#department-edit").val(),
                newGender: $("#gender-edit").val(),
                newDorm: $("#dorm-edit").val(),
                newPhoneNumber: $("#phoneNumber-edit").val(),

                firstname: selectedStudent.firstname,
                lastname: selectedStudent.lastname,
                studentID: selectedStudent.studentID,
                department: selectedStudent.department,
                gender: selectedStudent.gender,
                dorm: selectedStudent.dorm,
                phoneNumber: selectedStudent.phoneNumber,
                IS_ID: selectedStudent.IS_ID,
            }

            $.post("../students/update",theStudent,(response)=>{
                console.log(response);

                Update = false;
                $("#btnUpdate").text("Update")

                if (response.changedRows > 0) {
                    console.log(theStudent.newFirstname + " is update.")
                    renderStudent();
                    clearSidebar();
                }
            })

        }else{
            Update = true;
            $("#btnUpdate").text("Update ?")
            console.log("now you are ready to update");

        }
    }
)