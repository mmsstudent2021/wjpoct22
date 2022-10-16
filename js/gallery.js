
const uploaderUI = document.querySelector('#uploaderUI');
const uploader = document.querySelector('#uploader');
const uploaded = document.querySelector('.uploaded');

uploaderUI.addEventListener('click',_=>uploader.click())

uploader.addEventListener('change',_=> {

    [...uploader.files].forEach(currentFile => {
        const reader = new FileReader();
        console.log(reader)
        reader.readAsDataURL(currentFile);
        reader.addEventListener('load',event => {
            const newImage = new Image();
            newImage.src = event.target.result
            newImage.classList.add("w-100","rounded-3","mb-4","animate__animated","animate__tada")
            uploaded.append(newImage)
        })
    })

})