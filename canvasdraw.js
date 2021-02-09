// by Chtiwi Malek ===> CODICODE.COM

var mousePressed = false;
var lastX, lastY;
var ctx;
var xcoordinates = [];
var ycoordinates = [];
var k;
var xvalue;
var yvalue;
var xarray = [];
var yarray = [];
var setacoord = 4500;
var setbcoord = 3600;
var TotalArea = 0;
function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });
    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    $('#myCanvas').mouseup(function (e) {
        if (mousePressed) {
            mousePressed = false;
            cPush();
        }
    });
    $('#myCanvas').mouseleave(function (e) {
        if (mousePressed) {
            mousePressed = false;
            cPush();
        }
    });
    drawImage();
}
function moveleft() {
    xvalue = xvalue - 1;
    drawImage(xvalue, yvalue);
}
function movetop() {
    yvalue = yvalue - 1;
    drawImage(xvalue, yvalue);
}
function moveright() {
    xvalue = xvalue + 1;
    drawImage(xvalue, yvalue);
}
function movedown() {
    yvalue = yvalue + 1;
    drawImage(xvalue, yvalue);
}
// D:\Projects\Undo_Redo on canvas\image--002.jpg
// D:\Projects\Undo_Redo on canvas\Dental\image--002.jpg
// image--002.jpg
// D:\Projects\Undo_Redo on canvas\image--002.jpg
function rer(x, y){
    xvalue = x
    yvalue = y
    drawImage()
}
function setcoord(x, y){
    setacoord = x;
    setbcoord = y;
}
function drawImage() {
    var image = new Image();
    image.src = "cropPreview.png";
    $(image).load(function () {
        // left or right
        // up or down
        ctx.drawImage(image, xvalue, yvalue, setacoord, setbcoord);
        cPush();
    });    
}
function moveleft(){
    xvalue = Math.round(xvalue) - 1
    drawImage(xvalue, yvalue)
}
function movetop(){
    yvalue = Math.round(yvalue) - 1
    drawImage(xvalue, yvalue)
}
function moveright(){
    xvalue = Math.round(xvalue) + 1
    drawImage(xvalue, yvalue)
}
function movedown(){
    yvalue = Math.round(yvalue) + 1
    drawImage(xvalue, yvalue)
}
function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        xcoordinates.push(Math.round(x));
        ycoordinates.push(Math.round(y));
        ctx.lineTo(x, y);        
        // console.log("X = ",Math.round(x),"Y = ",Math.round(y))
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

var cPushArray = new Array();
var cStep = -1;

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
    document.title = cStep + ":" + cPushArray.length;
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
    }
}
function haha(){
    ctx.beginPath();
    ctx.fillStyle = "#00FF00";
    for(var i=0;i<xarray.length;i++){
        ctx.arc(xarray[i], yarray[i], 1, 0, 2 * Math.PI, true);
    }
    ctx.fill();
}
function cCheck() {
    var madhu = xcoordinates[0];
    var mbn  = ycoordinates[0];
    var area = 0;
    xarray.push(madhu);
    yarray.push(mbn);
    for(var i=1;i<xcoordinates.length;i++){
        if (madhu - xcoordinates[i] <=5 && madhu - xcoordinates[i] >= -5 ){ 
            if(mbn - ycoordinates[i] <= 5 && mbn - ycoordinates[i] >= -5){
                xarray.push(xcoordinates[i]);
                yarray.push(ycoordinates[i]);
                madhu = xcoordinates[i];
                mbn = ycoordinates[i];
            }
        }
    }
    // console.log(xcoordinates[0], xcoordinates[xcoordinates.length - 1]);
    // console.log(ycoordinates[0], ycoordinates[ycoordinates.length - 1]);
    console.log("Starting Coordinates ", xarray[0], yarray[0]);
    console.log("Ending Coordinates ", xarray[xarray.length - 1], yarray[yarray.length - 1]);
    if(xcoordinates[0] - xarray[xarray.length - 1] <= 3 && xcoordinates[0] - xarray[xarray.length - 1] >= -3){
        if(ycoordinates[0] - yarray[yarray.length - 1] <= 3 && ycoordinates[0] - yarray[yarray.length - 1] >= -3){
            // console.log(xarray, yarray);
                haha();
            for(var i=0;i<xarray.length-1;i++){
                area = area + (xarray[i]*yarray[i + 1] - yarray[i]*xarray[i + 1])
            }
        }
    }
    for(var i=Math.min(...ycoordinates);i<Math.max(...ycoordinates);i++){
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(Math.min(...xcoordinates), i, 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }
    for(var i=Math.min(...xcoordinates);i<Math.max(...xcoordinates);i++){
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(i, Math.min(...ycoordinates), 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }
    for(var i=Math.min(...ycoordinates);i<Math.max(...ycoordinates);i++){
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(Math.max(...xcoordinates), i, 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }
    for(var i=Math.min(...xcoordinates);i<Math.max(...xcoordinates);i++){
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(i, Math.max(...ycoordinates), 1, 0, 2 * Math.PI, true);
        ctx.fill();
    }
    // console.log("WIDTH = ", Math.max(...xarray) - Math.min(...xarray));
    // console.log("HEIGHT = ", Math.max(...yarray) - Math.min(...yarray));
    // console.log("AREA = ", Math.abs(area) / 2);
    TotalArea = Math.abs(area) / 2;
}
function getvalues(){
    startxfunction(xcoordinates[0]);
    startyfunction(ycoordinates[0]);
    endxfunction(xcoordinates[xcoordinates.length - 1]);
    endyfunction(ycoordinates[ycoordinates.length - 1]);
    heightfunction(Math.max(...yarray) - Math.min(...yarray));
    widthfunction(Math.max(...xarray) - Math.min(...xarray));
    areafunction(TotalArea);
}
function generate(){
    var pdfname = document.getElementById("pdfname").value
    var NameOfTheDoctor = document.getElementById("NameOfTheDoctor").value;
    var Demography = document.getElementById("Demography").value;
    var OPDNumber = document.getElementById("OPDNumber").value;
    var ToothNumber = document.getElementById("ToothNumber").value;
    var ProcedureDetails = document.getElementById("ProcedureDetails").value;
    var RecallTime = document.getElementById("RecallTime").value;
    var doc = new jsPDF();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = dd+'-'+mm+'-'+yyyy;
    console.log(today, time);
    if(xcoordinates[0]>0 && ycoordinates[0]>0 && xcoordinates[xcoordinates.length - 1]>0 && ycoordinates[ycoordinates.length - 1]>0 && pdfname!=""){
        // doc.text("Hello world!", 10, 10);
        for(var i=0;i<xcoordinates.length;i++){
            doc.text(".", xcoordinates[i], ycoordinates[i]);
        }
        h = "Height = " + String(Math.max(...ycoordinates) - Math.min(...ycoordinates));
        w = "Width = " + String(Math.max(...xcoordinates) - Math.min(...xcoordinates));
        a = "Area = " + String(TotalArea);
        doc.text(h, 5,10);
        doc.text(w,5,20);
        doc.text(a, 5, 30);
        doc.text(NameOfTheDoctor, 5, 40);
        doc.text(Demography, 5, 50);
        doc.text(OPDNumber, 5, 60);
        doc.text(ToothNumber, 5, 70);
        doc.text(ProcedureDetails, 5, 80);
        doc.text(RecallTime, 5, 90);
        doc.text(NameOfTheDoctor, 5, 40);
        var s = pdfname + " " + today + " " + time + ".pdf"
        doc.save(s);
    }
}
function cleararea(){
    xcoordinates= [];
    ycoordinates = [];
    xarray = [];
    yarray = [];
    drawImage(0,0);
    TotalArea = 0
    getvalues();
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
    }
}