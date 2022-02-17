img="";
status1="";
objects=[];

function preload(){
    img=loadImage("luggage-1650171_640.jpg");
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(status1!=""){
       for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status:object detected";
           fill("#ff0000")
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
           noFill();
           stroke("red");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }

}

function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}
function modelloaded(){
    console.log("model is loaded");
    status1=true;
    object_detector.detect(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}