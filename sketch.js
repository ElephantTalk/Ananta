let nSlider;
let rSlider;
let noOfSides;
let radius;
let midPoints;
var arr = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  nSlider = new ArraySlider("Sides", [3, 4, 5, 6, 7, 8, 9, 10], 1, reset);
  rSlider = new Slider("Radius", 20, 200, 100, 1, reset);

  fillHueSlider = new Slider("Fill Color", 0, 100, 64);
  fillBrightnessSlider = new Slider("Fill Brightness", 0, 100, 100);
  strokeHueSlider = new Slider("Line Color", 0, 100, 14);
  strokeBrightnessSlider = new Slider("Line Brightness", 0, 100, 1000);

  reset();
}

function reset() {
  noOfSides = nSlider.value();
  radius = rSlider.value();
  draw();
}

function draw() {
  background(0);

  push();
  translate(width * 0.5, height * 0.5);
  polygon(0, 0, radius, noOfSides);
  // subPoly(0, 0, 100, noOfSides);
  star(0, 0, 5, -radius, noOfSides);

  pop();
  // console.log(arr);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;

    vertex(sx, sy);
  }
  fill(fillHueSlider.value(), 100, 100, fillBrightnessSlider.value());
  stroke(strokeHueSlider.value(), 100, 100, strokeBrightnessSlider.value());
  endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  strokeWeight(2);
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    // let sx = radius1 * cos(a * angle) + x;
    // let sy = radius1 * sin(a * angle) + y;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;

    // sx = x + cos(a + halfAngle) * radius2;
    // sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
