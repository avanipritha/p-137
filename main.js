status = "";
objects = [];

function setup()
{
    canvas = createCanvas(340,200);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 340, 200);
    if(status != "")
    {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == inputvalue)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = inputvalue + " Found";
                var synth = window.speechSynthesis;
                speak_data = inputvalue + "Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_found").innerHTML = inputvalue + " Not Found";
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    inputvalue = document.getElementById("objectname").value;
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;

}