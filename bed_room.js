status = "";
objects = [];

function setup()
{
    canvas = createCanvas(650, 420);
    canvas.center();
    objectDetection = ml5.objectDetector('cocossd', modelLoaded);
}

function preload()
{
    img = loadImage('bedroom.jpg');
}

function modelLoaded()
{
    status = true;
    console.log("Cocossd Loaded!")
    objectDetection.detect(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 650, 420);

    if(status != "")
    {
       for(i = 0; i < objects.length; i++)
       {
        document.getElementById("status").innerHTML = "Status : Objects being detected";
        fill("red");
        stroke("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }
}