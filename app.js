let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-game");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let turnO=true;
let count=0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ //playerO
            box.innerText="O";
            turnO=false;
        }else{ //playerX
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;
        
        checkWinner();

        if(count===9 && !checkWinner()){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText="Game draw,Want to play again?";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) =>{
    msg.innerText="Congrats,Winner is "+winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
}

const resetGame = () =>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);