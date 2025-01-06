const containerEl = document.querySelector(".container");
const nextButton = document.querySelector(".next");
const bubbleSortButton = document.querySelector(".bubble-sort");
const selectionSortButton = document.querySelector(".selection-sort");
const autoButton = document.querySelector(".auto");
const stopButton = document.querySelector(".stop");
const descHeading = document.querySelector(".desc-heading");
const desc = document.querySelector(".desc");
const temp = document.querySelector(".temp");
const descSteps = document.querySelector(".desc-steps");
const complexity = document.querySelector(".complexity");
let numbers = [10,20,30,40,50,60,70,80,90,100];
let automate;

const descSorts = [ {
    heading: "Bubble Sort",
    desc: "Bubble Sort is one of the simplest sorting algorithms. It repeatedly compares adjacent elements in a list and swaps them if they are in the wrong order. This process continues until the list is sorted.",
    steps: ["Start at the beginning of the list.","Compare the first element with the second. If the first is greater than the second, swap them.","Move to the next pair and repeat the comparison and swapping process.","Continue this for all elements in the list. After one pass, the largest element \"bubbles up\" to its correct position at the end of the list.","Repeat the above steps for the remaining unsorted portion of the list until no swaps are needed."],
}, {
    heading: "Selection Sort",
    desc: "Selection Sort is one of a sorting algorithm that works by repeatedly selecting the smallest element from the unsorted portion of the list and placing it at the beginning of the sorted portion. This sort is unstable sort (does not preserve the relative order of equal elements).",
    steps: ["Divide the list into two parts : sorted and unsorted portion","Find the smallest element in the unsorted portion.","Swap it with the first element of the unsorted portion to place it in its correct position.","Move the boundary of the sorted portion one element to the right.","Repeat the above steps for the remaining unsorted portion until the list is sorted."]
}];

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
        div.style.height = `${number*3}px`;
        div.classList.add("bar");
        div.textContent = number;
        containerEl.appendChild(div);
    });    
}

async function bubbleSort(array) {
    const bars = document.querySelectorAll(".bar");
    for(let i = 0 ; i < array.length - 1 ; i++ ) {
        for(let j = 0 ; j < array.length - i - 1 ; j++ ) {
            await HighlightBars([bars[j] , bars[j+1]],100);
            await nextStep();
            if(array[j] > array[j+1])
            {
                await canSwap(bars[j] , bars[j+1],100);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];  
            }
            await UnHighlightBars([bars[j] , bars[j+1]],200)
        }
        bars[bars.length - i - 1].classList.add("sorted");
    }    
    bars[0].classList.add("sorted");
}


async function selectionSort(array) {
    const bars = document.querySelectorAll(".bar");
    for(let i = 0 ; i < array.length - 1 ; i++ ) {
        let minIndex = i;
        await CheckBars([bars[minIndex]],50);
        for(let j = i+1 ; j < array.length ; j++ ) {
            await HighlightBars([bars[j]],100);
            await nextStep();
            if(array[j] < array[minIndex]) {
                await UncheckBars([bars[minIndex]],50);
                minIndex = j;
                await CheckBars([bars[minIndex]],50);
            }
            await UnHighlightBars([bars[j]],100)
        }
        await canSwap(bars[minIndex],bars[i],100);
        [array[minIndex], array[i]] = [array[i], array[minIndex]];  
        await UncheckBars([bars[minIndex]],100);
        bars[i].classList.add("sorted");
    }    
    bars[array.length-1].classList.add("sorted");
}

function nextStep() {
    return new Promise((resolve)=> {
        nextButton.addEventListener("click",()=>{
            resolve(true);
        }) 
    })
}

function canSwap(bar1,bar2,time) {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            const tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;
            const tempText = bar1.textContent;
            bar1.textContent = bar2.textContent;
            bar2.textContent = tempText;
            resolve(true);
        },time);                
    });
}

function CheckBars(bars,time) {   
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bars.forEach((bar)=>{
                bar.classList.add("check");
            });
            resolve();
        },time); 
    })       
}

function UncheckBars(bars,time) {   
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bars.forEach((bar)=>{
                bar.classList.remove("check");
            });
            resolve();
        },time); 
    })       
}

function HighlightBars(bars,time) {   
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bars.forEach((bar)=>{
                bar.classList.add("highlighted");
            });
            resolve();
        },time); 
    })       
}

function UnHighlightBars(bars,time) {
    return new Promise((resolve)=>{
        setTimeout(()=> {
            bars.forEach((bar)=>{
                bar.classList.remove("highlighted");
            });
            resolve();
        },time); 
    })    
}

bubbleSortButton.addEventListener("click",()=> { 
    temp.remove();
    containerEl.innerHTML = "";
    clearInterval(automate);
    let shuffledNumber = shuffleArray(numbers);
    renderArray(shuffledNumber);    
    complexity.style.display = "block";
    descHeading.textContent = descSorts[0].heading;
    desc.textContent = descSorts[0].desc;   
    descSteps.innerHTML = ""; 
    descSorts[0].steps.forEach((step)=>{
        const liEl = document.createElement("li");
        liEl.textContent = step;
        descSteps.appendChild(liEl);
    });
    
    setTimeout(()=> {
        bubbleSort(shuffledNumber);
    },300);    
})


selectionSortButton.addEventListener("click",()=> { 
    temp.remove();
    containerEl.innerHTML = "";
    clearInterval(automate);
    let shuffledNumber = shuffleArray(numbers);
    renderArray(shuffledNumber);   
    complexity.style.display = "block";
    descHeading.textContent = descSorts[1].heading;
    desc.textContent = descSorts[1].desc;    
    descSteps.innerHTML = ""; 
    descSorts[1].steps.forEach((step)=>{
        const liEl = document.createElement("li");
        liEl.textContent = step;
        descSteps.appendChild(liEl);
    });
    setTimeout(()=> {
        selectionSort(shuffledNumber);
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
