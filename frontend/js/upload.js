function selectFile() {
    document.getElementById("file").click();
}

function hideMessage() {
    document.getElementById("uploadMessage").style.display = "none";
    // document.getElementById("uploadBtn").style.display = "none";
}

function resetUpload(status, message) {
    document.getElementById("dropzone").innerHTML = '';
}

async function uploadImage(event) {
    const input = document.getElementById("file");
    const status = document.getElementById("status");

    if (input.files.length === 0) {
        alert("Selecione uma imagem");
        return;
    }

    const formData = new FormData();
    formData.append("image", input.files[0]);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            console.log(data.url);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar imagem.");
    }
}

function showFileName() {
    const file = document.getElementById("file").files[0];
    const preview = document.getElementById("preview");

    if (file) {
        hideMessage();
        document.getElementById("fileName").textContent = file.name;
        document.getElementById("sendBtn").disabled = false;

        preview.src = URL.createObjectURL(file);
        preview.hidden = false;
    }
}

function dragOver(event) {
    event.preventDefault();
    document.getElementById("dropzone").classList.add("drag");
}

function dragLeave() {
    document.getElementById("dropzone").classList.remove("drag");
}

function dropFile(event) {
    event.preventDefault();

    const input = document.getElementById("file");
    dragLeave();

    input.files = event.dataTransfer.files;

    showFileName();
}
