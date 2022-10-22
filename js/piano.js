

const sounds = ["C4","D4","E4","F4","G4","A4","B4","C5"];

const keybord = document.querySelector('#keyboard');


function getSoundUrl(keyName){
    return "sounds/"+keyName+".mp3";
}

sounds.forEach(sound => {

    const keyBtn = document.createElement('div');
    keyBtn.classList.add('col');
    keyBtn.innerHTML = `<div key="${sound}" class="key bg-primary text-center fs-4 text-white rounded d-flex align-items-end justify-content-center"><p class="pe-none">${sound}</p></div>`;
    keybord.append(keyBtn)
    const audio = new Audio(getSoundUrl(sound));
    audio.controls = true
    document.body.append(audio)
})


document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click',_=> {
        const currentPressKey = key.getAttribute('key');
        const currentAudio = document.querySelector(`[src*='${currentPressKey}.mp3']`)
        console.log(currentAudio)
        currentAudio.play()
    })
})