const grid=document.querySelector('.grid');
const scoredisplay=document.querySelector('#score');
// those two are the width and the height of the block that we are going to build so 
const blockwidth=100;
const blockheight=20;
const boardwidth=560;
const boardheight=300;

const balldiameter=20
let timerid
let xdirection=-2
let ydirection=2
let score=0

// i need to specify the postion where the player is going to be
const userstart=[230,10]
let currentposition=userstart

// we should specify the start position for the ball so that we can easily control the movement of the ball
const ballstart=[270,40]
let ballcurrentposition=ballstart

// create block
class Block{
    //here the x and the y axis indicate the bottom left corner postion so starting from the bottom left we will know where the other points lie 
    constructor(xaxis,yaxis){
        this.bottomleft=[xaxis,yaxis];
        this.bottomright=[xaxis+blockwidth,yaxis]
        this.topleft=[xaxis,yaxis+blockheight]
        this.topright=[xaxis+blockwidth,yaxis+blockheight]


    }
}
// all my blocks
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),

]

// so here we will draw the blocks
function addBlock(){

// cause now we have an array to iterate we will be using a for loop 
for(let i=0; i<blocks.length; i++){
    const block=document.createElement('div');
    block.classList.add('block');
    block.style.left=blocks[i].bottomleft[0]+'px';
    block.style.bottom=blocks[i].bottomleft[1]+'px';
    grid.appendChild(block);
}
}

addBlock();

// add user
const user=document.createElement('div');
user.classList.add('user');
user.style.left=currentposition[0]+'px';
user.style.bottom=currentposition[1]+'px';
grid.appendChild(user);








//move the (user
function moveuser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentposition[0]>0){

            
            currentposition[0]-=10
            user.style.left=currentposition[0]+'px';
            user.style.bottom=currentposition[1]+'px';}
            break;
        case 'ArrowRight':
            if(currentposition[0]<boardwidth-blockwidth){
    
                
                currentposition[0]+=10
                user.style.left=currentposition[0]+'px';
                user.style.bottom=currentposition[1]+'px';}
                break;

    }
}
document.addEventListener('keydown',moveuser)



// we need to add a ball
const ball =document.createElement('div')
ball.classList.add('ball');
ball.style.left=ballcurrentposition[0]+'px';
ball.style.bottom=ballcurrentposition[1]+'px';
grid.appendChild(ball)

// move ball
function moveball(){
    ballcurrentposition[0]+=xdirection
    ballcurrentposition[1]+=ydirection
    ball.style.left=ballcurrentposition[0]+'px';
ball.style.bottom=ballcurrentposition[1]+'px';
checkforcollison()
    
}
timerid=setInterval(moveball,30)


// check for collisions
function checkforcollison(){
    // check for block collisons not the wall 

    for (let i=0; i<blocks.length;i++){
        if(
            (ballcurrentposition[0]>blocks[i].bottomleft[0]&& ballcurrentposition[0]<blocks[i].bottomright[0])&&
            (ballcurrentposition[1]+balldiameter>blocks[i].bottomleft[1] && ballcurrentposition[1]<blocks[i].topleft[1])
        ){
            // we need to remove the block
            const allblocks=Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            // this is how you remove an element from the array
            blocks.splice(i,1);
            changedirection()
            score ++
            scoredisplay.innerHTML=score
            // check for win
            if(blocks.length===0){
                scoredisplay.innerHTML="YOU WIN";
                clearInterval(timerid);
                document.removeEventListener('keydown',moveuser)

            }
        }
    }
    // check for walll collisions
    if (ballcurrentposition[0] >= (boardwidth - balldiameter) || ballcurrentposition[0] <= 0) {
        xdirection = -xdirection; // Change horizontal direction
    }
    if (ballcurrentposition[1] >= (boardheight - balldiameter) || ballcurrentposition[1] <= 0) {
        ydirection = -ydirection; // Change vertical direction
    }
    // check for user collison cause we need to it to bounce back whenever it hits the user so 
    if(
        (ballcurrentposition[0]>currentposition[0] && ballcurrentposition[0] <currentposition[0]+blockwidth)&&
        (ballcurrentposition[1]>currentposition[1] && ballcurrentposition[1] <currentposition[1]+blockheight))
        {
            changedirection()
        }
    // and we need to check the condition for gameover
   if(ballcurrentposition[1]<=0){
    clearInterval(timerid);
    scoredisplay.innerHTML="you lose";
    document.removeEventListener('keydown')
   }
}
function changedirection(){
if(xdirection===2 && ydirection===2){
    ydirection=-2
    return
}
if(xdirection==2 && ydirection==-2){
    xdirection=-2
    return
}
if(xdirection==-2 && ydirection==-2){
    ydirection=2
    return
}
if(xdirection==-2 && ydirection==2){
    xdirection=2
    return
}
}