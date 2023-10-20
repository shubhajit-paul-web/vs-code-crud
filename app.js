function setLangLogo(value) {
    // Determine the file type based on the extension and return the appropriate logo
    if (value.endsWith(".html")) return "html-logo.png";
    if (value.endsWith(".css")) return "css-logo.png";
    if (value.endsWith(".js")) return "JavaScript-logo.png";
    return "text-file-logo.png";
}

document.addEventListener("DOMContentLoaded", function () {
    const createFile = document.querySelector("#create-file");
    const files = document.querySelector("#files");

    // Create Operation: Prompt user for a file name and create a new file entry
    createFile.addEventListener("click", function () {
        const fileName = prompt("Please enter your file name:");

        if (fileName && fileName.length > 0) {
            const langLogo = setLangLogo(fileName);
            const li = document.createElement("li");

            li.innerHTML = `
                <img src="./images/${langLogo}" />
                <input type="text" value="${fileName}" disabled />
                <div class="file-operation">
                    <div class="edit-btn"><i class="fa-solid fa-pen"></i></div>
                    <div class="delete-btn"><i class="fa-solid fa-trash"></i></div>
                </div>
            `;

            // Add the new file entry to the list and set up file operations
            files.appendChild(li);
            fileOperations();
        } else {
            alert("Please enter a valid file name.");
        }
    });

    // Initialize file operations
    fileOperations();

    function fileOperations() {
        const files = document.querySelectorAll("#files li");

        files.forEach(function (file) {
            const editBtn = file.querySelector(".edit-btn");
            const deleteBtn = file.querySelector(".delete-btn");
            const inputBox = file.querySelector("input");
            
            // Update/Edit Operation: Enable editing and update the file entry on Enter key press
            editBtn.addEventListener("click", function () {
                inputBox.removeAttribute("disabled");
                inputBox.classList.add("active");
                inputBox.addEventListener("keypress", function ({ key }) {
                    if (key === "Enter") {
                        inputBox.setAttribute("disabled", "");
                        inputBox.classList.remove("active");
                        inputBox.previousElementSibling.src = `./images/${setLangLogo(inputBox.value)}`;
                    }
                });
            });

            // Delete Operation: Prompt for confirmation and remove the file entry
            deleteBtn.addEventListener("click", function () {
                if (!deleteBtn.disabled && confirm("Confirm file deletion?")) {
                    file.remove();
                }
            });
        });
    }
});
