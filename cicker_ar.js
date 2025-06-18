const popup_ac = document.querySelectorAll(".achivement");
const detail_ac = document.querySelector(".detail_achivement");
const cancels = document.querySelectorAll(".modal-content-achivement ion-icon");
const closes = document.querySelectorAll(".modal-content-achivement button");

popup_ac.forEach((ac) => {
    ac.onclick = () =>{
        detail_ac.style.display = "flex";
        detail_ac.style.alignItems="center";
        detail_ac.style.justifyContent = "center";
        detail_ac.firstElementChild.style.animation = "scaleup 0.5s ease";
    }
});

cancels.forEach((cancel,i) => {
    cancel.onclick = () => {
        detail_ac.firstElementChild.style.animation = "scaledown 0.5s ease";
        setTimeout(() => {
            detail_ac.style.display = "none";
        },500)
    }
    closes[i].onclick = () => {
        detail_ac.firstElementChild.style.animation = "scaledown 0.5s ease";
        setTimeout(() => {
            detail_ac.style.display = "none";
        },500)
    }
})