img = "";
status = "";
objects = [];
sound = "";

function preload(){
    img = loadImage("dog_cat.jpg");
    sound = loadSound("alert.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();   
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status_").innerHTML = "Status: Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);
    
    if(status!="")
    {
        objectDetector.detect(video,gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status_").innerHTML = "Status: Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill(0,0,255);
            percentage = floor(objects[i].confidence*100);
            stroke(255,0,0);
            text(objects[i].label + " " + percentage + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height-20);
            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby detected";
                sound.stop();
            }
            else {
                document.getElementById("baby_status").innerHTML = "No baby detected";
                sound.play();
            }
            if(objects.length < 0){
                document.getElementById("baby_status").innerHTML = "No baby detected";
                sound.play();
            }              
        }
        
    }
}

function modelLoaded(){
    console.log("CocoSSD is initialized!!");
    status = true;
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    
        console.log(results);
        objects = results;      
}