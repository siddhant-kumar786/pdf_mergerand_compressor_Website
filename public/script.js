document.getElementById('fileUpload').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        document.getElementById('content').style.display = 'none';
        document.getElementById('contentII').style.display = 'flex';
        document.getElementById('footerOfMerge').style.display = "none";
    }
});

document.querySelector('.two').addEventListener('click', ()=>{
    document.getElementById('content').firstElementChild.innerHTML = "Compress PDF files";
    document.getElementById('contentLine').innerHTML = "Reduce file size while optimizing for maximal PDF quality.";
    document.getElementById('fileUpload').multiple = false;
    document.getElementById('sidecontainer').firstElementChild.innerHTML = "Compress Pdf";
    document.getElementById('suggestion').style.display = "none";

})

document.querySelector('.one').addEventListener('click', ()=>{
    document.getElementById('content').firstElementChild.innerHTML = "Merge Pdf Files";
    document.getElementById('contentLine').innerHTML = "Combine PDFs in the order you want with the easiest PDF merger available.";
    document.getElementById('sidecontainer').firstElementChild.innerHTML = "Merge Pdf";
    document.getElementById('suggestion').innerHTML = "To change the order of your PDFs, drag and drop the files as you want.";

})


