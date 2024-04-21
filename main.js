img= "";
estado= "";
objetos= [];
function preload(){
    img= loadImage("dog_cat.jpg");
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: detectando objetos";
}

function modelLoaded(){
    console.log("Modelo cargado");
    estado= true;
}

function gotResult(error,results){
   if (error) {
     console.error(error);
   }
   console.log(results);

   objetos= results;
}

function draw(){
    image(video,0,0,380,380);
    /*fill("red");
    text("perro",45,75);
    noFill();
    stroke("red");
    rect(30,60,450,350);
    fill("blue");
    text("gato",320,120);
    noFill();
    stroke("blue");
    rect(300,90,270,320);*/

    if (estado!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for (var i=0; i<objetos.length; i++){
            document.getElementById("status").innerHTML= "Status: objeto detectado";
            document.getElementById("numeroobjeto").innerHTML= "Numero de objetos detectados: " + objetos.length;
            fill(r,g,b);
            porcentaje= floor(objetos[i].confidence*100);
            text(objetos[i].label+" "+porcentaje+"%",objetos[i].x+15,objetos[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objetos[i].x,objetos[i].y,objetos[i].width,objetos[i].height);
        }
    }

}
