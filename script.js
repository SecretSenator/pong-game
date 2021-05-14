// alert("JS CONNECTED");
let ball=document.querySelector(".ball");
let ballcord=ball.getBoundingClientRect();
let leftpaddle=document.querySelector(".left");
let rightpaddle=document.querySelector(".right");
let balltop=ballcord.top;
let ballleft=ballcord.left;
let board=document.querySelector(".board");
let boardbound=board.getBoundingClientRect();
let y=true;
let x=true;
let leftplayerlife=4;
let rightplayerlife=4;

document.addEventListener("keydown",function(ev){
    if(ev.key=="w")
    {
        movpad(leftpaddle,-window.innerHeight*0.1);
    }
    else if(ev.key=="ArrowUp")
    {
        movpad(rightpaddle,-window.innerHeight*0.1);
    }
    else if(ev.key=="s")
    {
        movpad(leftpaddle,window.innerHeight*0.1);
    }
    else if(ev.key=="ArrowDown")
    {
        movpad(rightpaddle,window.innerHeight*0.1);
    }
    
})

function movpad(cpad,change)
{
   let cpadbound=cpad.getBoundingClientRect();
     
   if(cpadbound.top+change>=boardbound.top&&cpadbound.bottom+change<=boardbound.bottom)
   {
    cpad.style.top=cpadbound.top+change+"px";
   }
}

function setColor(idx)
{
    let allicon=document.querySelectorAll(".life.circle");
    allicon[idx].style.color="#686ded";
}

function resetgame()
    {
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall);
    }

function moveBall()
{
    let ballcord=ball.getBoundingClientRect();
    let balltop=ballcord.top;
    let ballleft=ballcord.left;
    let ballbottom=ballcord.bottom;
    let ballright= ballcord.right;

    //check for collision with walls
    let hastouchedleft=ballleft<boardbound.left;
    let hastouchedright=ballright>boardbound.right;

    if(hastouchedleft)
    {
        leftplayerlife--;
        setColor(leftplayerlife);
        if(leftplayerlife==0){
            alert("Game Over || Player B Won🎉🎉🎉🌹");
            document.location.reload();
        }
        else{
            return resetgame();
        }
    }
    else if(hastouchedright)
    {
        rightplayerlife--;
        setColor(3+rightplayerlife);
        if(rightplayerlife==0){
            alert("Game Over || Player A Won🎉🎉🎉🌹");
            document.location.reload();
        }
        else{
            return resetgame();
        }
    }

    
    
    //handle vertival bound
    if(balltop<=boardbound.top||ballbottom>=boardbound.bottom)
    {
        y=!y;
    }

    //handle horizontal bound
    if(ballleft<=boardbound.left||ballright>=boardbound.right)
    {
        x=!x;
    }

    //left hit
    let lpaddlebound=leftpaddle.getBoundingClientRect();
    let rpaddlebound=rightpaddle.getBoundingClientRect();
    //******collision *//
    if(ballleft<=lpaddlebound.right&&ballright>=lpaddlebound.left+7
        && balltop>=lpaddlebound.top-5&& ballbottom<=lpaddlebound.bottom+5)
    {
        x=!x;
    }
    //right hit
    if(ballright>=rpaddlebound.left&&ballleft<=rpaddlebound.right-7
        && balltop>=rpaddlebound.top-5&& ballbottom<=rpaddlebound.bottom+5)
    {
        x=!x;       
    }

    ball.style.top=y==true?balltop+3+"px":balltop-3+"px";
    ball.style.left=x==true?ballleft+3+"px":ballleft-3+"px";

    requestAnimationFrame(moveBall);
}



requestAnimationFrame(moveBall);
