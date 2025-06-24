const popup_ac = document.querySelectorAll(".achivement");
const detail_ac = document.querySelector(".detail_achivement");
const cancels = document.querySelectorAll(".modal-content-achivement ion-icon");
const closes = document.querySelectorAll(".modal-content-achivement button");
const modals = document.querySelectorAll(".modal-content-achivement");
const achivements = document.querySelectorAll(".achivement");

popup_ac.forEach((ac,index) => {
    ac.onclick = () =>{
        detail_ac.style.display = "flex";
        detail_ac.style.alignItems="center";
        detail_ac.style.justifyContent = "center";
        
        modals[index].style.display = "flex";
        modals[index].style.animation = "scaleup 0.5s ease";
    }
});

cancels.forEach((cancel,i) => {
    cancel.onclick = () => {
        modals[i].style.animation = "scaledown 0.5s ease";
        setTimeout(() => {
            modals[i].style.display = "none";
            detail_ac.style.display = "none";
        },500)
    }
    closes[i].onclick = () => {
        modals[i].style.animation = "scaledown 0.5s ease";
        setTimeout(() => {
            modals[i].style.display = "none";
            detail_ac.style.display = "none";
        },500)
    }
})