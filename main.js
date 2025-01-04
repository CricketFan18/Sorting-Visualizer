const containerEl = document.querySelector(".container");
const nextButton = document.querySelector(".next");
const bubbleSortButton = document.querySelector(".bubble-sort");
const autoButton = document.querySelector(".auto");
const stopButton = document.querySelector(".stop");
let numbers = [10,20,30,40,50,60,70,80,90,100];
let automate;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

function renderArray(array) {
    array.forEach((number)=> {
        const div = document.createElement("div");
        div.style.height = `${number*2.5}px`;
        div.classList.add("bar");
        div.textContent = number;
        containerEl.appendChild(div);
    });    
}

async function bubbleSort(array) {
    const bars = document.querySelectorAll(".bar");
    for(let i = 0 ; i < array.length - 1 ; i++ ) {
        for(let j = 0 ; j < array.length - i - 1 ; j++ ) {
            await HighlightBars(bars[j] , bars[j+1]);
            await nextStep();
            if(array[j] > array[j+1])
            {
                await canSwap(bars[j] , bars[j+1]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];  
            }
            await UnHighlightBars(bars[j] , bars[j+1])
        }
        bars[bars.length - i - 1].classList.add("sorted");
    }    
    bars[0].classList.add("sorted");
}

function nextStep() {
    return new Promise((resolve)=> {
        nextButton.addEventListener("click",()=>{
            resolve(true);
        }) 
    })
}

function canSwap(bar1,bar2) {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            const tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;
            const tempText = bar1.textContent;
            bar1.textContent = bar2.textContent;
            bar2.textContent = tempText;
            resolve(true);
        },100);                
    });
}

function HighlightBars(bar1,bar2) {   
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bar1.classList.add("highlighted");
            bar2.classList.add("highlighted");
            resolve();
        },100); 
    })       
}

function UnHighlightBars(bar1,bar2) {
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bar1.classList.remove("highlighted");
            bar2.classList.remove("highlighted");
            resolve();
        },200); 
    })    
}


bubbleSortButton.addEventListener("click",()=> { 
    containerEl.innerHTML = "";
    clearInterval(automate);
    let shuffledNumber = shuffleArray(numbers);
    renderArray(shuffledNumber);
    setTimeout(()=> {
        bubbleSort(shuffledNumber);
    },300);    
})

autoButton.addEventListener("click",()=> {
    automate = setInterval(()=>{
        nextButton.click();
    },100);
})

stopButton.addEventListener("click",()=> {
    clearInterval(automate);
})

renderArray(numbers);
