let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;

const gridLength = 50;

$(function(){
    mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
        [0,3,1,0,3,0,0,0,0,3,1,1,1,3,1,3],
        [0,1,3,0,0,0,1,1,0,0,1,1,1,3,3,3],
        [0,0,1,0,1,1,1,1,1,0,1,1,1,0,1,3],
        [1,0,3,0,0,1,1,3,1,0,0,1,0,3,0,0],
        [0,0,0,0,0,3,1,1,1,1,0,3,3,1,1,0],
        [1,3,0,1,0,0,1,0,3,3,0,0,0,3,0,0],
        [1,1,1,1,1,0,0,0,0,1,1,0,1,3,3,0],
        [0,0,0,1,1,1,1,0,3,0,1,0,3,3,3,1],
        [1,1,1,0,1,0,3,0,3,1,0,0,0,3,1,3],
        [1,3,0,1,0,3,3,1,0,0,0,1,0,0,0,1],
        [1,3,0,0,1,1,0,0,0,3,0,0,3,3,0,1],
        [1,3,3,1,1,0,0,1,1,0,3,3,0,1,3,0],
        [1,3,0,0,0,0,1,3,3,1,1,3,3,3,1,3],
        [1,3,1,1,0,3,3,0,0,3,0,0,0,3,3,0],
        [0,0,1,1,0,0,1,0,0,0,1,1,0,1,0,1],
        [0,0,0,3,0,0,0,0,3,0,0,0,0,0,0,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }

    imgMountain=new Image();
    imgMountain.src="images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="images/Enemy.png";

    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==1){
                        ctx.drawImage(imgMountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==3){
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    };

});

$(document).on("keydown",function(event){
    //debugger;
    let targetImg,targetBlock,cutImagePositionX;
    targetImg={
        "x":-1,
        "y":-1
    };
    targetBlock={
        "x":-1,
        "y":-1
    };

    event.preventDefault();

    switch(event.code){
        case "ArrowLeft":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=175;
            break;
        case "ArrowUp":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePositionX=355;
            break;
        case "ArrowRight":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=540;
            break;
        case "ArrowDown":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePositionX=0;
            break;
        default:
            return;
    }

    if(targetImg.x<=750 && targetImg.x>=0 && targetImg.y<=750 && targetImg.y>=0){
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }

    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: 
                $("#talkBox").text("有山");
                break;
            case 2: 
                $("#talkBox").text("抵達終點 聽歌休息一下吧!!");
                document.querySelector('.YT').innerHTML = `<iframe width="700" height="470"
                src="https://www.youtube.com/embed/SwZMS-ISbH4?autoplay=1">
                </iframe><br><a href="./index.html">
                <center><button class="shape-ex1">Again.</button></center></a>`;
                YT.show();
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: 
                $("#talkBox").text("哈囉");
                break;
        }
        }else{
            $("#talkBox").text("邊界");
        }

    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});