showLoader();

const sounds = [
    {sound:"C4",keyCode:65},
    {sound:"D4",keyCode:83},
    {sound:"E4",keyCode:68},
    {sound:"F4",keyCode:70},
    {sound:"G4",keyCode:74},
    {sound:"A4",keyCode:75},
    {sound:"B4",keyCode:76},
    {sound:"C5",keyCode:186},
];

const keyboard = document.querySelector('#keyboard');

function showLoader(){
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader')
    loaderDiv.innerHTML = `<div class="vh-100 d-flex justify-content-center align-items-center fixed-top">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;

    document.body.append(loaderDiv)
}

function removeLoader(){
    const loader = document.querySelector('.loader');
    loader.remove()
}

function getSoundUrl(keyName){
    return "sounds/"+keyName+".mp3";
}

sounds.forEach( ({sound,keyCode},index) => {

    const keyBtn = document.createElement('div');
    keyBtn.classList.add('col');
    keyBtn.innerHTML = `<div key="${sound}" class="key bg-primary text-center fs-4 text-white rounded d-flex align-items-end justify-content-center">
    <p class="pe-none">${sound}</p>
    <audio class="d-none" src="./sounds/${sound}.mp3" controls></audio>
    </div>`;

    keyboard.append(keyBtn)
})


document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click',_=> {
        const currentPressKey = key.getAttribute('key');
        const currentAudio = document.querySelector(`[src*='${currentPressKey}']`);
        currentAudio.play()
    })
})

document.addEventListener('keyup',event => {
    // နှိပ်လိုက်တဲ့ key က sounds array ထဲပါလားစစ်တာ။ ပါတယ်ဆို sound object မပါရင် null
    const condition = sounds.find(({sound,keyCode}) => keyCode === event.keyCode);
    console.log(condition)
    if(condition){
        // const currenSound = document.querySelector(`[src*='${condition.sound}']`)

        //sound play
        const currenSound = new Audio();
        currenSound.src = `sounds/${condition.sound}.mp3`;
        currenSound.play();

        //show active
        const currentKey = document.querySelector(`[key=${condition.sound}]`);
        currentKey.classList.add('active')
        // setTimeout(_=>currentKey.classList.remove('active'),200);
        currentKey.addEventListener('transitionend',_ => currentKey.classList.remove('active'))
    }
})

window.addEventListener('load',function (){
    console.log("loading finish")
    removeLoader()
})