const span = document.querySelectorAll("aside .btn_topic > span");
const legend = document.querySelector("legend");
let aside = document.querySelector("aside");
const shortcuts = document.querySelectorAll("aside > #shortcut");
const lines = document.querySelectorAll(".lines");
const h_s_lines = document.querySelectorAll("nav ul div > li");
const mediaQuery = window.matchMedia('(max-width: 768px)');

function getAsidehigh(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(aside.scrollHeight)
        },10000)
    })
}

// let stateAsidehigh = false, sizeAsidehigh = 0;
function handleResponsiveChange(e,st_high = false) {
  if (e.matches) {
    if(st_high){
        // if(!stateAsidehigh){
        //     stateAsidehigh = true;
        //     getAsidehigh().then(result=>{
        //         sizeAsidehigh = result;
        //         document.body.style.gridTemplate=`"header" auto
        //                    "menu" 190px
        //                    "navigation" ${result}px
        //                    "content" 15fr
        //                    "footer" auto / auto`;
        //     })
        // }else{
        //     document.body.style.gridTemplate=`"header" auto
        //                 "menu" 190px
        //                 "navigation" ${sizeAsidehigh}px
        //                 "content" 15fr
        //                 "footer" auto / auto`;
        // }
        aside.style.height = 'calc(100% + 0px)';
    }else{
        // document.body.style.gridTemplate=`"header" auto
        //                "menu" 190px
        //                "navigation" 50px
        //                "content" 15fr
        //                "footer" auto / auto`;
        aside.style.height = '50px';
    }
  } else {
    // console.log('หน้าจอใหญ่');
  }
}

mediaQuery.addEventListener('change', handleResponsiveChange);

lines.forEach(
    (line,index) => {
        line.onmouseover = () => {
            h_s_lines[index].classList.add("put_li")
        };
    
        line.onmouseout = () => {
            h_s_lines[index].classList.remove("put_li")
        };
    }
);
let mediaQuery_count = 0;
toggleSlice = () => {

    span.forEach(ele => {
        ele.classList.toggle('active')
    })
    aside.classList.toggle('show');
    legend.classList.toggle('shown');
    shortcuts.forEach(shortcut => {
        shortcut.classList.toggle('shown');
    })
    shortcuts.forEach(shortcut => {
        if(shortcut.classList.contains('shown')){
            shortcut.style.width = 'calc(100% - 50px)';
        }
        else
        {
            shortcut.style.width = '100%';
        }
    })
    if(mediaQuery_count > 0){
        handleResponsiveChange(mediaQuery,true);
        mediaQuery_count = 0;
    }else{
        handleResponsiveChange(mediaQuery);
        mediaQuery_count++;
    }
}

const click = document.querySelectorAll("nav ul div > li");
const contents = document.querySelectorAll("main #info_content");
const container_technologyes = document.querySelectorAll(".content2 .work_tech .container_technology");
const bars = document.querySelectorAll("#progressBar");
const work_tech_img = document.querySelectorAll("#sourceImg");

let content_1_index = 0;

container_technologyes.forEach((tech,i) => {
    const tag_p = tech.querySelector(".progress-container p");
    tech.onmouseenter = () => {
        let progress = 0;
        tag_p.style.opacity = "0";
        bars[i].classList.replace('progressing-bar','success_progress');
        const clearProgress = setInterval(() => {
            bars[i].textContent = progress + "%";
            if (progress >= 100) {
                clearInterval(clearProgress);
            }
            else{
                progress += 1;
            }
        },10)
    };
    tech.onmouseleave = () => {
        tag_p.style.opacity = "1";
        bars.forEach((bar) => {
            bar.classList.replace('success_progress','progressing-bar');
        });
    };

});

for(let i = 0; i < click.length; i++){
    click[i].addEventListener("click", () =>{
        click.forEach((ele,index) => {
            ele.classList.remove('open');
            contents[index].classList.remove('contentActive');
        })
        click[i].classList.add('open');
        contents[i].classList.add('contentActive');
        //*************************************************
        if(contents[1].classList.contains('contentActive')){
            if(content_1_index > 0){
                bars.forEach((bar) => {
                    bar.classList.replace('success_progress','progressing-bar');
                    bar.style.transition = "none";
                    setTimeout(() => {
                        bar.style.transition = "all 1s ease-in-out";
                        bar.classList.replace('progressing-bar','success_progress');
                    },10)
                });
            }
            else{
                bars.forEach((bar) => {
                    bar.classList.replace('progressing-bar','success_progress');
                });
                content_1_index++;
            }
            work_tech_img.forEach((ele) => {
                ele.classList.remove("grayscale");
            });
            
            setTimeout(() => {
                work_tech_img.forEach((ele) => {
                    ele.classList.add("grayscale");
                });
                bars.forEach((bar) => {
                    bar.classList.replace('success_progress','progressing-bar');
                });
                setTimeout(() => {
                    container_technologyes.forEach((tech) => {
                        const tag_p = tech.querySelector(".progress-container p");
                        tag_p.style.opacity = "1";
                    });
                },1000);
            },1500);
            
            let progress = 0;
            const clearProgress = setInterval(() => {
                progress += 1;
                bars.forEach((bar) => {
                    bar.textContent = progress + "%";
                });
                if (progress >= 100) {
                    clearInterval(clearProgress);
                }
            },10)
        }
        else{
            bars.forEach((bar) => {
                bar.classList.replace('success_progress','progressing-bar');
            });
            content_1_index = 0;
        }
        //*************************************************
        shortcuts.forEach((shortcut,index) => {
            if(contents[index].classList.contains('contentActive')){
                shortcut.classList.remove('nav_menu');
            }
            else
            {
                shortcut.classList.add('nav_menu');
            }
        })
    })
}

//None Cursor
let delay = 0;
let delay2 = 0;
const cursor = document.querySelectorAll('.typing p');
const slicedown = document.querySelectorAll('.before');
    cursor.forEach(line => {
        const charCount = line.textContent.length;
        const duration = charCount * 0.01; // 0.1s ต่ออักษร (ปรับได้)

        setTimeout(() => {
        line.style.visibility = 'visible';
        line.style.animation = `typingani ${duration}s steps(${charCount}) forwards, cursor 0.2s step-end infinite alternate`;
        
        // เอา cursor ออกหลังพิมพ์จบ
        setTimeout(() => {
            line.style.borderRight = 'none';
        }, (duration + 1) * 1000);
        }, delay * 1000);

        delay += duration + 1.5; // 0.5s พักก่อนพิมพ์บรรทัดถัดไป
    })
    slicedown.forEach(eles => {
        setTimeout(() => {
            eles.classList.add('slicedown')
        }, delay2 * 1000)
        delay2 += 2;
    })
    
window.addEventListener('load', () => {
    span.forEach(ele => {
        ele.classList.toggle('active')
    })
    aside.classList.toggle('show');
    legend.classList.toggle('shown');
    shortcuts.forEach(shortcut => {
        shortcut.classList.toggle('shown');
    })
    shortcuts.forEach((shortcut,index) => {
        if(contents[index].classList.contains('contentActive')){
            shortcut.classList.remove('nav_menu');
        }
        else
        {
            shortcut.classList.add('nav_menu');
        }

        if(shortcut.classList.contains('shown')){
            shortcut.style.width = 'calc(100% - 50px)';
        }
        else
        {
            shortcut.style.width = '100%';
        }
    })
    handleResponsiveChange(mediaQuery,true);
});

//Show Check Me
const mycheck_me = document.getElementById("mycheck_me");
const content_of_me = document.getElementById("content_of_me");
mycheck_me.onclick = () => {
    if(content_of_me.style.height){
        // content_of_me.style.transition = "0.5s ease-in-out";
        content_of_me.style.height = null;
        content_of_me.style.visibility = "hidden";
        content_of_me.style.overflow = "hidden";
    }
    else{
        // content_of_me.style.transition = "0.5s ease-in-out";
        content_of_me.style.height = content_of_me.scrollHeight + "px";
        content_of_me.style.visibility = "visible";
        content_of_me.style.overflow = "visible";
    }
}

//Rotate When Hover
const font_i_What_I_do = document.querySelectorAll('.spin');
const font_i = document.querySelectorAll('.spin i');

font_i_What_I_do.forEach((el,index) => {
    el.addEventListener('mouseenter', () => {
        font_i[index].classList.add('bx-tada');
        font_i[index].addEventListener('animationend', () => {
            font_i[index].classList.remove('bx-tada');
        });
    });
    
    // el.addEventListener('mouseleave', () => {
    //     font_i[index].classList.remove('bx-tada');
    // });
});


//view with observers
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if(entry.isIntersecting){
            if(entry.target.classList.contains("appearent")){
                entry.target.classList.add("appearent_show");
            }
            else
            {
                entry.target.style.animation = "drop 1.5s ease-out";
            }
        }
    })
})
const appearents = document.querySelectorAll(".appearent");
appearents.forEach((el) => {observer.observe(el)})

observer.observe(document.querySelector("#telegram"));

Send_to_telegram = () => {
    const text = encodeURIComponent("สวัสดีครับ ผมมาจากเว็บไซต์ของคุณ!");
    const link = encodeURIComponent("https://web.telegram.org/k/#@FOUR_1992");
    const url = `https://t.me/FOUR_1992`;
    setTimeout(() => {
        window.open(url, "_blank");
    },2200);
}

const discord = document.getElementsByClassName("discord_")[0];

getHeightScroll = () => {
    return new Promise((resolve) => {
        if(window.pageYOffset > 0)
        {
            resolve(window.pageYOffset);
        }
        else
        {
            resolve(0);
        }
    })
}

getShare = async () => {
    try{
        const height_scrolling = await getHeightScroll();
        discord.firstElementChild.style.animation = "scaleup 0.5s ease";
        discord.style.display = "flex";
        discord.style.justifyContent = "center";
        discord.style.alignItems = "center";
        setTimeout(() => {
            window.scrollBy({
                top: height_scrolling,
                behavior: 'smooth'
            });
        },500)
    }catch(err){
        console.log(err);
    }
}

getExit = () => {
    discord.firstElementChild.style.animation = "scaledown 0.5s ease";
    setTimeout(() => {
        discord.style.display = "none";
    },500);
}

function copyToClipboard(button) {
    const copy_ = document.querySelector(button.dataset.copy);
    const copy_text = copy_.textContent.replace(/\s+/g," ").trim();

    navigator.clipboard.writeText(copy_text)
      .then(() => {
        const label = button.querySelector(".copy-label");
        const label_textContent = label.textContent;
        button.disabled = true;
        label.textContent = "Copied!";

        setTimeout(() => {
            button.disabled = false;
            label.textContent = label_textContent;
        },1000);
      })
      .catch(err => {
        alert("Fail at: " + err);
      });
} 