let slider;
let noOfSides;
let midPoints;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(3, 10, 3, 1);
  slider.position(width + 20, 10);
  slider.style("width", "80px");
  slider.input(polySides);
  noOfSides = 3;
}

function polySides() {
  noOfSides = slider.value();
  draw();
}
function draw() {
  background(0);

  push();
  translate(width * 0.5, height * 0.5);
  polygon(0, 0, 100, noOfSides);
  // subPoly(0, 0, 100, noOfSides);
  // star(0, 0, 5, 100, noOfSides);

  pop();
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  let arr = [];
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;

    vertex(sx, sy);
    arr.push([sx, sy]);
    console.log(arr);
  }
  endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  let arr = [];
  let arr2 = [];
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    // let sx = radius1 * cos(a * angle) + x;
    // let sy = radius1 * sin(a * angle) + y;
    arr.push([sx, sy]);
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;

    // sx = x + cos(a + halfAngle) * radius2;
    // sy = y + sin(a + halfAngle) * radius2;
    arr2.push([sx, sy]);
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
