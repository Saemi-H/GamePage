window.onload=function(){
    //fetchingData();
    searchBar();
    gnbSub();
    mnavSub();
    visualSlide();
    scrollDownNav();
    famDrop();
    
}//function


const fetchingData=()=>{
        
    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "d82253dcdcmsh6777c6c3d6110bdp1e95fcjsnbb8830b7ed5a",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
      }
    })
.then(response => {
	console.log(response);
    let data=response.json();
    return data;
})
.then(data=>{
    
console.log(data)
const visualListCont=document.querySelector('.visual-list')
const gameList=document.querySelector('.game-list');
const videoBg=document.querySelector('#background-video')
const videoInner=document.querySelector('#video-inner > video')
const videoSrc=document.createElement('source')
const videoBgSrc=document.createElement('source')
const updateListCont=document.querySelector('#update-inner > ul')

videoBg.appendChild(videoBgSrc)
videoInner.appendChild(videoSrc)

const {results : gameData}= data;

const randomNum=parseInt(Math.random()*gameData.length-1)

const allGameSlide=(game)=>{
    const allGameList=document.querySelector('.game-list')
    let gameIndex=0;
   const allGamePlay=()=>{
    if(gameIndex >= game.length-1){
        gameIndex=0
    }else{
        gameIndex++
    }allGameList.style.left=-gameIndex*30+'%'
   }
    setInterval(allGamePlay, 3000)
   
}//allGameSlide
allGameSlide(gameData);

videoSrc.src = gameData[randomNum].clip.clip
videoBgSrc.src=gameData[randomNum].clip.clip

for(let i=0; i<=2; i++){
    const visualList=document.createElement('li')
    const visualListA=document.createElement('a')
    const visualTit=document.createElement('p')
    visualListCont.appendChild(visualList)
    visualList.appendChild(visualListA)
    visualListA.appendChild(visualTit)
    visualList.style.backgroundImage=`url("${gameData[randomNum+i].background_image}")`
    visualTit.innerText=gameData[randomNum+i].name
}

for(let i=0; i<=3; i++){
    const updateList=document.createElement('li')
    const updateImgCont=document.createElement('div')
    const updateImg=document.createElement('img')
    const updateLayOver=document.createElement('div')
    const updateTit=document.createElement('p')
    const moreBtn=document.createElement('button')

    updateListCont.appendChild(updateList)
    updateList.appendChild(updateImgCont)
    updateList.appendChild(updateLayOver)
    updateImgCont.appendChild(updateImg)
    updateLayOver.appendChild(updateTit)
    updateLayOver.appendChild(moreBtn)

    updateImg.src=gameData[i].background_image
    updateTit.innerText=gameData[i].name
    moreBtn.innerText='자세히보기'

    updateImgCont.classList.add('img-cont')
    updateLayOver.classList.add('over-layer')
}//updatefor



data.results.map(game=>{
const li = document.createElement('li')
const picCont=document.createElement('div')
const gamePic=document.createElement('img')
const overLayer=document.createElement('div')
const layerTit=document.createElement('h4')
const officialWeb=document.createElement('p')
const officialWebArrow=document.createElement('span')
const gameTitle = document.createElement('h3');

gameList.appendChild(li)
li.appendChild(picCont)
picCont.appendChild(gamePic)
picCont.appendChild(overLayer)
overLayer.appendChild(layerTit)
overLayer.appendChild(officialWeb)
officialWeb.appendChild(officialWebArrow)
li.appendChild(gameTitle)

picCont.classList.add('pic-cont')
overLayer.classList.add('hover-layer')
officialWeb.innerText='Official Website'
officialWeb.innerHTML='Official Website <i class="fas fa-arrow-circle-right"></i>'
gameTitle.innerText=game.name
gamePic.src=game.background_image
})
})
.catch(err => {
	console.error(err);
});

}//fetchingData

const searchBar=()=>{
    const searchBtn=document.querySelector('.fa-search')
    const inputBar=document.querySelector('.search > input')
    searchBtn.addEventListener('click', ()=>{
        inputBar.classList.add('focused')
    })
}//searchBar

const gnbSub=()=>{
    const pcGnb=document.querySelector('#pc-gnb');
    const mainMenu=pcGnb.querySelectorAll('ul > li > a');
    const subMenu=document.querySelectorAll('.sub-menu');
    const subBg=document.querySelector('.sub-bg');

    for(let i=0; i<= mainMenu.length-1; i++){
        mainMenu[i].addEventListener('mouseenter', ()=>{
            subBg.classList.add('show-sub-bg');
            for(let i=0; i<= subMenu.length-1; i++){
                subMenu[i].classList.add('show-sub-menu');
            }    
        })
    }

    for(let i=0; i<= subMenu.length-1; i++){
        subMenu[i].addEventListener('mouseout', ()=>{
            for(let i=0; i<= subMenu.length-1; i++){
                subMenu[i].classList.remove('show-sub-menu');
            } 
            subBg.classList.remove('show-sub-bg'); 
        })
    }
    
}//gnbSub

const mnavSub=()=>{
    const mNavBar=document.querySelector('.fa-bars');
    const mNav=document.querySelector('#mnav')
    const mMainMenu=mNav.querySelectorAll('.mmain-menu');
    const mSub=mnav.querySelectorAll('.sub-menu');

        mNavBar.addEventListener('click', (e)=>{
            e.preventDefault()
        mNavBar.classList.toggle('on')
        mNav.classList.toggle('show-mnav');
    })
    const toggleMenu =(e)=>{
        e.preventDefault();
        mMainMenu.forEach(menu=>{
            menu.classList.remove('clicked')
        })
        mSub.forEach(sub=>{
            sub.classList.remove('show-msub')
        })
            e.target.classList.toggle('clicked')
            e.target.parentElement.querySelector('.sub-menu').classList.toggle('show-msub')
    }
    
    for(let i=0; i<=mMainMenu.length-1;i++){   
            mMainMenu[i].addEventListener('click', toggleMenu) 
    }
    

}//mnavSub

const visualSlide=()=>{
    const visualSlide = document.querySelector('.visual-list')
    const dots=document.querySelectorAll('.visual-dots > li')
    let index=-1
    visualSlide.style.left=100+'%'
    let dotIndex=0;
    dots[0].classList.add('on');
    
    const autoVisualPlay=()=>{

        dots.forEach(ele=>{
            ele.classList.remove('on')
        })
        if(index<1){
            index++;
            dotIndex++;
        }else{
            index=-1;
            dotIndex=0;
        }
        visualSlide.style.left=-index*100+'%';
        dots[dotIndex].classList.add('on');
    }
    setInterval(autoVisualPlay, 3000)
}//visualSlide

scrollDownNav=()=>{
    const pcGnb=document.querySelector('#pc-gnb')
    document.addEventListener('scroll', (e)=>{
        if(scrollY >= 70){
            pcGnb.style.top = 0
        }else{
            pcGnb.style.top=`${50}px`
        }
    })
}//scrollDownNav

famDrop=()=>{
    const mainBtn=document.querySelector('.main > a')
    const optionBox=document.querySelector('.option-box')
    const selectOption=document.querySelectorAll('.option-box > ul >li>button')
    mainBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        optionBox.classList.toggle('drop-select')
    })
    for(let i=0; i<=selectOption.length-1; i++){
        selectOption[i].addEventListener('click', (e)=>{
           let thisValue = e.target.value
           console.log(e.target.value)
           mainBtn.innerText=thisValue;
        })
    }
    document.addEventListener('click', ()=>{
        optionBox.classList.remove('drop-select')
    })
}//famDrop