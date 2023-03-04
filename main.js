song="";
leftWristx="";
leftWristy="";
rightWristx="";
rightWristy="";
scoreLeftWrist=0;
scoreRightWrist=0;


function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotResults)
}

function gotResults(results){
    if(results.length>0){
       console.log(results);
       scoreRightWrist=results[0].pose.keypoints[10].score;
       console.log("ScoreRightWrist ="+scoreRightWrist);
       scoreLeftWrist =results[0].pose.keypoints[9].score;
       console.log("ScoreLeftWrist ="+scoreLeftWrist);
    
       leftWristx=results[0].pose.leftWrist.x;
       leftWristy=results[0].pose.leftWrist.y;
       console.log("Left Wrist X= "+leftWristx+"Left Wrist Y= "+leftWristy);

       rightWristx=results[0].pose.rightWrist.x;
       rightWristy=results[0].pose.rightWrist.y;
       console.log("Right Wrist X= "+rightWristx+"Right Wrist Y= "+rightWristy);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
 if(scoreRightWrist>0.2){
circle(rightWristx,rightWristy,20);

if(rightWristy>0 && rightWristy<=100){
    document.getElementById("score").innerHTML="Score: 0.5x";
    song.rate(0.5);
}
else if(rightWristy>100 && rightWristy<=200){
    document.getElementById("score").innerHTML="Score: 1x";
    song.rate(1);
}
else if(rightWristy>200 && rightWristy<=300){
    document.getElementById("score").innerHTML="Score: 1.5";
    song.rate(1.5);
}
else if(rightWristy>300 && rightWristy<=400){
    document.getElementById("score").innerHTML="Score: 2";
    song.rate(2);
}
else if(rightWristy>400 && rightWristy<=500){
    document.getElementById("score").innerHTML="Score: 2.5";
    song.rate(2.5);
}
 }
    console.log(scoreLeftWrist);
    if(scoreLeftWrist > 0.02){
    circle(leftWristx,leftWristy,20);
    IsNumberleftWristY=Number(leftWristy);
    remove_decimal=floor(IsNumberleftWristY);
    volume= remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume ="+volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Pose Net Is Loaded")
}

