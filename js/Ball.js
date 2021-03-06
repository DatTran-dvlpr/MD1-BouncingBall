class Ball {
    constructor(x,y,r) {
        this.x=x;
        this.y=y;
        this.r=r;
        this.speed = 2.7;
        this.color = colorBall();
        this.direction = 1.55*Math.PI;
        //vector(hướng đi) của bóng, tính bằng góc (360=2PI)
    }
    setBallLocation(x){
        this.y=x;
}
    setBallDirection(x){
        this.direction=x;
    }
    checkBallMeetObstacle(){
        for (let i = 0; i < listObstacle.length; i++) {
            for (let j = 0; j < listObstacle[i].length; j++) {
                let ObStart = listObstacle[i][j].x;
                let ObEnd = listObstacle[i][j].x+listObstacle[i][j].lengthh;
                let ObTop = listObstacle[i][j].y;
                let ObBot = listObstacle[i][j].y+listObstacle[i][j].height;
                if(this.x+this.r>ObStart&&this.x-this.r<ObEnd){
                    //bóng trong phạm vi theo trục x của Obstacle
                    if((this.y+this.r)>ObTop && (this.y+this.r)<=(ObTop+this.speed+1) && 0<this.direction<Math.PI){
                        //bóng chạm mặt trên Obstacle
                        //CancelAnimationRunning? có cần thiết?
                        this.y=ObTop-this.r-1;
                        this.direction =2*Math.PI-this.direction;
                        listObstacle[i][j].updateColorAndHPAfterHit();
                        if(listObstacle[i][j].hp==0){
                            listObstacle[i].splice(j,1);
                            countNumbOfObstacle--;
                        }
                        plusScore();
                        showScoreInProcess();
                        checkBallMetObstacle=true;
                        return 1;
                    }
                    if((this.y-this.r)<ObBot && (this.y-this.r)>=(ObBot-this.speed-1) && Math.PI<this.direction<2*Math.PI){
                        //Bóng chạm mặt dưới Obstacle
                        this.y=ObBot+this.r+1;
                        this.direction =2*Math.PI-this.direction;
                        listObstacle[i][j].updateColorAndHPAfterHit();
                        if(listObstacle[i][j].hp==0){
                            listObstacle[i].splice(j,1);
                            countNumbOfObstacle--;
                        }
                        plusScore();
                        showScoreInProcess();
                        checkBallMetObstacle=true;
                        return 1;
                    }
                }
                if(this.x+this.r>ObStart&&(this.x+this.r)<=(ObStart+this.speed+1)){
                    if(this.y>=ObTop&&this.y<=ObBot){
                        if(this.direction<0.5*Math.PI||this.direction>1.5*Math.PI){
                            //Bóng chạm mé trái Obstacle
                            this.x=ObStart-this.r-1;
                            this.direction =Math.PI-this.direction;
                            listObstacle[i][j].updateColorAndHPAfterHit();
                            if(listObstacle[i][j].hp==0){
                                listObstacle[i].splice(j,1);
                                countNumbOfObstacle--;
                            }
                            plusScore();
                            showScoreInProcess();
                            checkBallMetObstacle=true;
                            return 1;
                        }
                    }
                }
                if(this.x-this.r<ObEnd&&this.x-this.r>=ObEnd-this.speed-1){
                    if(this.y>=ObTop&&this.y<=ObBot){
                        if(0.5*Math.PI<this.direction<1.5*Math.PI){
                            //Bóng chạm mé Phải Obstacle
                            this.x=ObEnd+this.r+1;
                            this.direction =3*Math.PI-this.direction;
                            listObstacle[i][j].updateColorAndHPAfterHit();
                            if(listObstacle[i][j].hp==0){
                                listObstacle[i].splice(j,1);
                                countNumbOfObstacle--;
                            }
                            plusScore();
                            showScoreInProcess();
                            checkBallMetObstacle=true;
                            return 1;
                        }
                    }
                }
            }
            }
    }
    checkBallMetBar(){
        // Physics Type:
        // if((this.y+this.r)>=bar.y&&this.x>=(bar.x+bar.length/3)&&this.x<=(bar.x+(2/3)*bar.length)){
        //     //bóng chạm giữa bar
        //     let a=this.direction;
        //     if(this.direction>0&&this.direction<=0.25*Math.PI){
        //         //bóng từ phía trái xiên 0<x<=0.25
        //         this.direction=1.5*Math.PI+a/2;
        //         return 1;
        //     }
        //     else if(this.direction>=0.75*Math.PI&&this.direction<Math.PI){
        //         //bóng từ phía phải xiên 0.75<=x<1
        //         this.direction=Math.PI+a/2;
        //         return 1;
        //     }
        //     else {
        //         //bóng từ phía trái hoặc phải gần vuông góc 0.25<x<0.75
        //         this.direction=1.75*Math.PI-a/2;
        //         return  1;
        //     }
        // }
        // if((this.y+this.r)>=bar.y&&this.x>=bar.x&&this.x<(bar.x+bar.length/3)){
        //     //bóng chạm mé trái bar
        //
        //     this.direction =1.2*Math.PI;
        //     return 1;
        // }
        // if((this.y+this.r)>=bar.y&&this.x>(bar.x+(2/3)*bar.length)&&this.x<=(bar.x+bar.length)){
        //     //bóng chạm mé phải bar
        //
        //     this.direction =1.8*Math.PI;
        //     return 1;
        // }
        //User Control Type: 7 field.
if((this.y+this.r)>=bar.y&&this.x>=bar.x&&this.x<(bar.x+bar.length/7)){
    this.setBallDirection(1.125*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+bar.length/7)&&this.x<(bar.x+2*bar.length/7)){
    this.setBallDirection(1.25*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+2*bar.length/7)&&this.x<(bar.x+3*bar.length/7)){
    this.setBallDirection(1.375*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+3*bar.length/7)&&this.x<(bar.x+4*bar.length/7)){
    this.setBallDirection(1.5*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+4*bar.length/7)&&this.x<(bar.x+5*bar.length/7)){
    this.setBallDirection(1.625*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+5*bar.length/7)&&this.x<(bar.x+6*bar.length/7)){
    this.setBallDirection(1.75*Math.PI);
    return 1;
}
if((this.y+this.r)>=bar.y&&this.x>=(bar.x+6*bar.length/7)&&this.x<=(bar.x+bar.length)){
    this.setBallDirection(1.875*Math.PI);
    return 1;
}
    }
    drawBall(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
        this.updatePosition();
    }
    drawBallStart(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
    }
    updatePosition(){
        this.x+=Math.cos(this.direction)*this.speed;
        this.y+=Math.sin(this.direction)*this.speed;
        if(this.x-this.r<0){
            //bóng chạm viền trái
            this.x=this.r;
            this.direction =3*Math.PI-this.direction;
        }
        else if(this.x+this.r>context.canvas.width){
            //bóng chạm viền phải
            this.x=context.canvas.width-this.r;
            this.direction =Math.PI-this.direction;
        }
        else if(this.y-this.r<0){
            //bóng chạm viền trên
            this.y=this.r;
            this.direction =2*Math.PI-this.direction;
        }
        else if(this.y+this.r>context.canvas.height) {
            //bóng chạm viền dưới
            for (let i = 0; i < balls.length; i++) {
                if (balls[i].y + balls[i].r >= context.canvas.height) {
                    balls.splice(i, 1);
                    countBalls--;
                    break;
                }
            }
            if (countBalls <= 0) {
                stopGame();
                checkGameOver = true;
                addButtonStart2();
                updateScore();
                showHighScore();
                document.getElementById("gameOver").innerText = 'GAME OVER';
                subScore = 0;
            }
        }
    }
}
let balls =[];
balls.push(new Ball(250,0,7));
let ballStartLocation = 0;
ballStartLocation = bar.y-balls[0].r;
balls[0].setBallLocation(ballStartLocation);
let checkRelease =false;
let ballDefaultSpeed =0;
let countBalls=1;
let checkBallMetObstacle=false;
function colorBall(){
    let r,g,b;
    r=Math.floor(Math.random()*256);
    g=Math.floor(Math.random()*256);
    b=Math.floor(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';
}


function restartGame(){
    checkGameOver=false;
    stopGame();
    countBalls=1;
    resetObstacle();
    countNumbOfObstacle=0;
    setObstacle();
   let tempBalls =[];
   tempBalls.push(new Ball(250,0,7));
   balls=tempBalls;
    balls[0].setBallLocation(ballStartLocation);
    balls[0].r=7;
    balls[0].color=colorBall();
    balls[0].direction=1.55*Math.PI;
    balls[0].speed=2.7;
   bar.x=230;
   bar.y=480;
   bar.length=60;
   bar.speed=3;
   checkRelease=false;
   checkMoveBall=0;
   checkMove=0;
   subScore=0;
   levelGame=1;
   showScoreInProcess();
   boosts=[];
   minusBoosts=[];
    document.getElementById("gameOver").innerText = '';
   start1();
}
