////////////////////////    FOR NAVIGATIONS (CLICK EVENTS)  //////////////

document.querySelectorAll('.image').forEach(function(image){
    image.addEventListener('click',function(){
        imageSRC = image.children[0].src;
        document.querySelector('#layer1').style.display = "none";
        document.querySelector('#layer2').style.display = "block";
        document.querySelector('.home').style.display = "block";
    })
})

document.querySelector('#btn1').addEventListener('click',function(){
    difficulty = "normal";
    document.querySelector('#layer2').style.display = "none";
    document.querySelector('#layer3').style.display = "block";
    makeSmallPuzzle();
})

document.querySelector('#btn2').addEventListener('click',function(){
    difficulty = "hard";
    document.querySelector('#layer2').style.display = "none";
    document.querySelector('#layer4').style.display = "block";
    makeBigPuzzle();
})

document.querySelector('.home').addEventListener('click',function(){
    document.querySelector('.home').style.display = "none";
    document.querySelector('#layer1').style.display = "block";
    document.querySelector('#layer2').style.display = "none";
    document.querySelector('#layer3').style.display = "none";
    document.querySelector('#layer4').style.display = "none";
    document.querySelector('#layer5').style.display = "none";
    wrapper.forEach(function(x){
        x.addEventListener('click', myFunction);
    })
})


let boxes = [];
function makeSmallPuzzle(){
    randomize(97,105);
    let inversions = checkInversion(95,105);
    while(inversions%2 != 0){
        
        randomize(97,105);
        inversions = checkInversion(97,105);
    }
    
    setBackgroundPositions();
}
function makeBigPuzzle(){
    randomize(106,121);
    let inversions = checkInversion(106,121);
    let flag = 0;
    while(flag == 0){
        let rowNumber = [(document.querySelector('#y').parentElement.id) - 106 ]/4;
        rowNumber = Math.floor(rowNumber);
        if(rowNumber %2 == 0){
            if(inversions %2 != 0){
                flag = 1;
            } else {
                
                randomize(106,121);
                inversions = checkInversion(106,121);
            }
        } else {
            if(inversions %2 != 0){
                
                randomize(106,121);
                inversions = checkInversion(106,121);
            } else {
                flag = 1;
            }
        }
    }
    
    setBackgroundPositions();
}
let wrapper = document.querySelectorAll('.wrapper');
let imageSRC, difficulty;
let moves;


function randomize(a,b) {
    boxes.forEach(function(box){
        box.innerHTML = "";
    });
    boxes = [];
    let tilesArr = [],
        div;
    for(i=a; i<=b; i++)
    {
        boxes.push(document.getElementById(i));
        div = document.createElement('div');
        div.className = 'tile';
        div.id = String.fromCharCode(i);
        tilesArr[i-a] = div;
    }

    boxes.forEach(function(box){
        let x = Math.floor(Math.random() * tilesArr.length);
        box.appendChild(tilesArr[x]);
        tilesArr.splice(x,1);
    });
    
}

function checkInversion(a,b){
    let tileSequence = [],
        inversions = 0;
    document.querySelectorAll('.tile').forEach(function(tile){
        if( parseInt(tile.parentElement.id) >= a && parseInt(tile.parentElement.id) <= b){
            tileSequence.push(tile.id);
        }
    });
    let max = tileSequence[0] ,pos;
    for(i=1;i<tileSequence.length;i++){
        if(tileSequence[i]>max){
            max = tileSequence[i];
            pos = i;
        }
    }
    tileSequence.splice(pos,1);
    console.log(tileSequence);
    tileSequence.forEach(function(x,index){
        let count = 0;
        for(i=index+1;i<tileSequence.length;i++){
            if(x > tileSequence[i]){
                count++;
            }
        }
        inversions = inversions + count;
    });
    console.log(inversions);
    return inversions;
}

/////////////////////////////////////////////////////////    FOR MOVING TILES   ////////////////////////// 

wrapper.forEach(function(x){
    x.addEventListener('click', myFunction);
})

function myFunction(e) {

    let blankBox;
    if(difficulty == "normal"){
        blankBox = document.querySelector('#i').parentElement;
    } else {
        blankBox = document.querySelector('#y').parentElement;
    }

    let clickedBox = e.target.parentElement;
    let blankBoxNum = parseInt(blankBox.id);
    let clickedBoxNum = parseInt(clickedBox.id);
    if(clickedBoxNum == blankBoxNum){
        return;
    }
    
    let adjacentBoxesArray = adjacentBoxes(blankBoxNum);
    if(adjacentBoxesArray.includes(clickedBoxNum)){

        moves++;

        let temp = clickedBox.lastChild.id;
        clickedBox.lastChild.id = blankBox.lastChild.id;
        blankBox.lastChild.id = temp;
        setBackgroundPositions();

    }

    checkIfComplete();
}

function checkIfComplete() {

    let flag = 0;
    boxes.forEach(function(box){
        let ascii = box.lastChild.id.charCodeAt(0);
        if(ascii != box.id){
            flag = 1;
            return;
        }  
    });
    if(flag == 0){
        console.log('complete');
        wrapper.forEach(function(x){
            x.removeEventListener('click', myFunction);
        })
        setTimeout(() => {
            document.querySelector('#layer5').style.display = "block";
        }, 300);
        
    }
}





////////////// supportive functions

function adjacentBoxes(boxNum) {
    if(boxNum == 97){
        return [98,100];
    }
    else if(boxNum == 98){
        return [97,99,101];
    }
    else if(boxNum == 99){
        return [98,102];
    }
    else if(boxNum == 100){
        return [97,101,103];
    }
    else if(boxNum == 101){
        return [98,100,102,104];
    }
    else if(boxNum == 102){
        return [99,101,105];
    }
    else if(boxNum == 103){
        return [100,104];
    }
    else if(boxNum == 104){
        return [101,103,105];
    }
    else if(boxNum == 105){
        return [102,104];
    }
    else if(boxNum == 106){
        return [107,110];
    }
    else if(boxNum == 107){
        return [106,108,111];
    }
    else if(boxNum == 108){
        return [107,109,112];
    }
    else if(boxNum == 109){
        return [108,113];
    }
    else if(boxNum == 110){
        return [106,111,114];
    }
    else if(boxNum == 111){
        return [107,110,112,115];
    }
    else if(boxNum == 112){
        return [108,111,113,116];
    }
    else if(boxNum == 113){
        return [109,112,117];
    }
    else if(boxNum == 114){
        return [110,115,118];
    }
    else if(boxNum == 115){
        return [111,114,116,119];
    }
    else if(boxNum == 116){
        return [112,115,117,120];
    }
    else if(boxNum == 117){
        return [113,116,121];
    }
    else if(boxNum == 118){
        return [114,119];
    }
    else if(boxNum == 119){
        return [115,118,120];
    }
    else if(boxNum == 120){
        return [116,119,121];
    }
    else if(boxNum == 121){
        return [117,120];
    }
}


function setBackgroundPositions(){

    if(difficulty == "normal"){
        document.querySelectorAll('.tile').forEach(function(tile){
            if(tile.id != 'i'){
                tile.style.background = "url("+ imageSRC +")";
            }
        })
        document.querySelector('#a').style.backgroundPosition = "0 0";
        document.querySelector('#b').style.backgroundPosition = "-133.33px 0px";
        document.querySelector('#c').style.backgroundPosition = "-266.66px 0px";
        document.querySelector('#d').style.backgroundPosition = "0px -133.33px";
        document.querySelector('#e').style.backgroundPosition = "-133.33px -133.33px";
        document.querySelector('#f').style.backgroundPosition = "-266.66px -133.33px";
        document.querySelector('#g').style.backgroundPosition = "0px -266.66px";
        document.querySelector('#h').style.backgroundPosition = "-133.33px -266.66px";
        document.querySelector('#i').style.background = "#222";
    }
    if(difficulty == "hard"){
        document.querySelectorAll('.tile').forEach(function(tile){
            if(tile.id != 'y'){
                tile.style.background = "url("+ imageSRC +")";
            }
        })
        document.querySelector('#j').style.backgroundPosition = "0 0";
        document.querySelector('#k').style.backgroundPosition = "-100px 0px";
        document.querySelector('#l').style.backgroundPosition = "-200px 0px";
        document.querySelector('#m').style.backgroundPosition = "-300px 0px";
        document.querySelector('#n').style.backgroundPosition = "0px -100px";
        document.querySelector('#o').style.backgroundPosition = "-100px -100px";
        document.querySelector('#p').style.backgroundPosition = "-200px -100px";
        document.querySelector('#q').style.backgroundPosition = "-300px -100px";
        document.querySelector('#r').style.backgroundPosition = "0px -200px";
        document.querySelector('#s').style.backgroundPosition = "-100px -200px";
        document.querySelector('#t').style.backgroundPosition = "-200px -200px";
        document.querySelector('#u').style.backgroundPosition = "-300px -200px";
        document.querySelector('#v').style.backgroundPosition = "0px -300px";
        document.querySelector('#w').style.backgroundPosition = "-100px -300px";
        document.querySelector('#x').style.backgroundPosition = "-200px -300px";
        document.querySelector('#y').style.background = "#222";
    }
    
}