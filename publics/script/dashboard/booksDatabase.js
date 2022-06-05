
function renderBooksTable() {
    //removing all tr from the table
    let Table = $("#student-table");
    Table.empty();

    Table.html("<tr class='w-100 fs-5 border border-0 border-bottom border-2 '><th>Title</th><th>Category</th></tr>")

    $.get("../books/getall", null, (data) => {
        console.log(data);
    });
}