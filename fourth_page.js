img_desk="";

function preload()
{
img_desk=loadImage('desk.jpg');
}

objectDetector= "";
objects = [];
status = "";

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img_desk, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img_desk, 0, 0, 640, 420);

      if(status != "")
      {
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
    document.getElementById("no_of_objects").innerHTML = "The Number Of Objects In The Image Are 1 , Out of Which Cocossd Has Detected " + objects.length + ".";
          fill(255, 0, 0);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(255, 0, 0);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
