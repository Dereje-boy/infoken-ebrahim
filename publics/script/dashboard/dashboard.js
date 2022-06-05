let selectedStudent;
$("#select-db").change((event) => {
    console.log($("#select-db").val());
    if ($("#select-db").val().toLowerCase().startsWith("books"))
        renderBooksTable();
})
$("#search").focusin(function (event) {
    $("#search").addClass("border-success text-green fw-bold")
})
$("#search").focusout(function (event) {
    $("#search").removeClass("border-success text-green fw-bold")
    $("#search").addClass("border-primary ")
})