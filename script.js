function saveFiles() {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert("رجاءً اختر ملفات أولاً.");
        return;
    }

    const savedFiles = [];

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = {
                name: files[i].name,
                type: files[i].type,
                content: e.target.result
            };
            savedFiles.push(fileData);

            localStorage.setItem("myFiles", JSON.stringify(savedFiles));
            displayFiles();
        };
        reader.readAsDataURL(files[i]);
    }
}

function displayFiles() {
    const container = document.getElementById('fileList');
    container.innerHTML = '';

    const saved = localStorage.getItem("myFiles");
    if (!saved) return;

    const files = JSON.parse(saved);

    files.forEach(file => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${file.name}</strong></p>
            <a href="${file.content}" download="${file.name}">🔽 تحميل</a>
            <hr>
        `;
        container.appendChild(div);
    });
}

window.onload = displayFiles;
function saveFiles() {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert("رجاءً اختر ملفات أولاً.");
        return;
    }

    let savedFiles = JSON.parse(localStorage.getItem("myFiles")) || [];

    let filesProcessed = 0;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = {
                name: files[i].name,
                type: files[i].type,
                content: e.target.result
            };
            savedFiles.push(fileData);
            filesProcessed++;

            if (filesProcessed === files.length) {
                localStorage.setItem("myFiles", JSON.stringify(savedFiles));
                displayFiles();
            }
        };
        reader.readAsDataURL(files[i]);
    }
}

function displayFiles() {
    const container = document.getElementById('fileList');
    container.innerHTML = '';

    const saved = localStorage.getItem("myFiles");
    if (!saved) return;

    const files = JSON.parse(saved);

    files.forEach((file, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${file.name}</strong></p>
            <a href="${file.content}" download="${file.name}">🔽 تحميل</a>
            <button onclick="deleteFile(${index})">🗑️ حذف</button>
            <hr>
        `;
        container.appendChild(div);
    });
}

function deleteFile(index) {
    let files = JSON.parse(localStorage.getItem("myFiles"));
    files.splice(index, 1);
    localStorage.setItem("myFiles", JSON.stringify(files));
    displayFiles();
}

window.onload = displayFiles;
function displayFiles() {
    const container = document.getElementById('fileList');
    container.innerHTML = '';

    const saved = localStorage.getItem("myFiles");
    if (!saved) return;

    const files = JSON.parse(saved);

    files.forEach((file, index) => {
        const div = document.createElement('div');
        div.className = "file-block";

        let contentHTML = `<p><strong>${file.name}</strong></p>`;

        // إذا كانت صورة، نعرضها
        if (file.type.startsWith("image/")) {
            contentHTML += `<img src="${file.content}" alt="${file.name}" class="preview-img"><br>`;
        }

        contentHTML += `
            <a href="${file.content}" download="${file.name}">🔽 تحميل</a>
            <button onclick="deleteFile(${index})">🗑️ حذف</button>
            <hr>
        `;

        div.innerHTML = contentHTML;
        container.appendChild(div);
    });
}
function deleteAllFiles() {
    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف جميع الملفات؟");
    if (confirmDelete) {
        localStorage.removeItem("myFiles");
        displayFiles();
    }
}
