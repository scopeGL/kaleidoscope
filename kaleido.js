document.body.style.background = "black";
alert("ESTE ES EL ARCHIVO CORRECTO");

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
}

function draw() {
  stroke(255);
  line(0, 0, width, height);
}