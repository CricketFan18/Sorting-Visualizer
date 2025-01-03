const containerEl = document.querySelector(".container");
const nextButton = document.querySelector(".next");
const bubbleSortButton = document.querySelector(".bubble-sort");
const autoButton = document.querySelector(".auto");
const stopButton = document.querySelector(".stop");
let numbers = [10,20,30,40,50,60,70,80,90,100];
let shuffledNumber = shuffleArray(numbers);
let automate;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

function renderArray() {
    shuffledNumber.forEach((number)=> {
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
            console.log(`${array[j]} , ${array[j+1]}`)
            HighlightBars(bars[j] , bars[j+1]);
            const a = await nextStep();
            if(array[j] > array[j+1])
            {
                const c = await canSwap(bars[j] , bars[j+1]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];  
            }
            UnHighlightBars(bars[j] , bars[j+1])
        }
        bars[bars.length - i - 1].style.backgroundColor = "green";
    }    
    bars[0].style.backgroundColor = "green";
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
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
        const tempText = bar1.textContent;
        bar1.textContent = bar2.textContent;
        bar2.textContent = tempText;
        console.log("swap animation...");
        resolve();
    },500);
}

function HighlightBars(bar1,bar2) {
    console.log("highlighted");
    
    bar1.style.backgroundColor = "#C40233";
    bar2.style.backgroundColor = "#C40233";
}

function UnHighlightBars(bar1,bar2) {
    console.log("unhighlighted");
    
    bar1.style.backgroundColor = "#99D1D5";
    bar2.style.backgroundColor = "#99D1D5";
}


bubbleSortButton.addEventListener("click",()=> {
    bubbleSort(shuffledNumber);
})

autoButton.addEventListener("click",()=> {
    automate = setInterval(()=>{
        nextButton.click();
    },1000);
})

stopButton.addEventListener("click",()=> {
    clearInterval(automate);
})

renderArray();
