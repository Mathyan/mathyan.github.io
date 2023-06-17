function submitForm() {
    var author = document.getElementById("author").value;
    var title = document.getElementById("title").value;
    var formats = document.querySelectorAll('input[name="format"]:checked');
    var selectedFormats = Array.from(formats).map(function(format) {
        return format.nextElementSibling.textContent;
    });
    var status = document.querySelector('input[name="status"]:checked');
    var purchaseMethod = document.getElementById("purchase");
    var location = purchaseMethod.options[purchaseMethod.selectedIndex].text;
    if (author === "" || title === "" || selectedFormats.length === 0 || status === null) {
        alert("Please fill in all the fields.");
        return;
    }

    var submission = {
        author: author,
        title: title,
        formats: selectedFormats,
        status: status.nextElementSibling.textContent,
        location: location
    };

    var localStorageSubmissions = JSON.parse(localStorage.getItem("submissions")) || [];
    localStorageSubmissions.push(submission);
    localStorage.setItem("submissions", JSON.stringify(localStorageSubmissions));
    displaySubmissions();
}

function displaySubmissions() {
        var submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        var lastSubmission = submissions[submissions.length - 1];
        if (document.querySelector(".data_table")) {
            document.querySelector(".data_table").remove();
        }
        if (lastSubmission) {
            var table = document.createElement("table");
            table.classList.add("data_table");

            var row1 = document.createElement("tr");
            var authorCell = document.createElement("td");
            authorCell.textContent = "Author: " + lastSubmission.author;
            row1.appendChild(authorCell);
            table.appendChild(row1);

            var row2 = document.createElement("tr");
            var titleCell = document.createElement("td");
            titleCell.textContent = "Title: " + lastSubmission.title;
            row2.appendChild(titleCell);
            table.appendChild(row2);

            var row3 = document.createElement("tr");
            var formatsCell = document.createElement("td");
            formatsCell.textContent = "Formats: " + lastSubmission.formats.join(", ");
            row3.appendChild(formatsCell);
            table.appendChild(row3);

            var row4 = document.createElement("tr");
            var statusCell = document.createElement("td");
            statusCell.textContent = "Status: " + lastSubmission.status;
            row4.appendChild(statusCell);
            table.appendChild(row4);


            var row5 = document.createElement("tr");
            var statusCell = document.createElement("td");
            statusCell.textContent = "Location: " + lastSubmission.location;
            row5.appendChild(statusCell);
            table.appendChild(row5);

            document.body.appendChild(table);
        }
    }

document.getElementById("colorToggle").addEventListener("click", function() {
    document.body.classList.toggle("bright");
    document.body.classList.toggle("grayscale");

    var selectedStyle = document.body.classList.contains("bright") ? "bright" : "grayscale";
    localStorage.setItem("colorStyle", selectedStyle);
});

document.addEventListener("DOMContentLoaded", function() {
    var storedStyle = localStorage.getItem("colorStyle");

    if (storedStyle === "grayscale") {
        document.body.classList.remove("bright");
        document.body.classList.add("grayscale");
    } else {
        document.body.classList.remove("grayscale");
        document.body.classList.add("bright");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    var table = document.getElementById("dataTable");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < submissions.length; i++) {
        var submission = submissions[i];

        var row = document.createElement("tr");

        var authorCell = document.createElement("td");
        authorCell.textContent = submission.author;
        row.appendChild(authorCell);

        var titleCell = document.createElement("td");
        titleCell.textContent = submission.title;
        row.appendChild(titleCell);

        var formatsCell = document.createElement("td");
        formatsCell.textContent = submission.formats.join(", ");
        row.appendChild(formatsCell);

        var statusCell = document.createElement("td");
        statusCell.textContent = submission.status;
        row.appendChild(statusCell);

        var statusCell = document.createElement("td");
        statusCell.textContent = submission.location;
        row.appendChild(statusCell);

        tbody.appendChild(row);
    }
});
