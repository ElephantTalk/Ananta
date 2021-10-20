function DodecaHexaSquareTiling(r) {
  this.polys = [];
  this.buildCell = function (x, y) {
    var sides = 12;
    var p;
    p = build_poly(x, y, r, sides);
    this.polys.push(p);
    var h12 = r * cos(Math.PI / sides);
    var side = r * sin(Math.PI / sides);


    var r6 = side / Math.sin(Math.PI / 6);
    var r4 = side / Math.sin(Math.PI / 4);
    var h6 = r6 * cos(Math.PI / 6);
    var h4 = r4 * cos(Math.PI / 4);
    var d4 = h12 + h4;
    var d6 = h12 + h6;
    var D4A = p5.Vector.fromAngle((2 * Math.PI) / 12);
    var D4B = p5.Vector.fromAngle((-2 * Math.PI) / 12);
    var D6 = p5.Vector.fromAngle((4 * Math.PI) / 12);
    D4A.setMag(d4);
    D4B.setMag(d4);
    D6.setMag(d6);
    console.log("h4 : ", h4);
    p = build_poly(x, y + d4, r4, 4);
    this.polys.push(p);
    p = build_poly(x + d6, y, r6, 6);
    this.polys.push(p);

    p = build_poly(x + D6.x, y + D6.y, r6, 6, Math.PI / 3);
    this.polys.push(p);
    p = build_poly(x + D4A.x, y + D4A.y, r4, 4, Math.PI / 6);
    this.polys.push(p);
    p = build_poly(x + D4B.x, y + D4B.y, r4, 4, -Math.PI / 6);
    this.polys.push(p);


  };


  this.buildGrid = function () {
    var sides = 12;
    var h12 = r * cos(Math.PI / sides);
    var side = r * sin(Math.PI / sides);
    var r6 = side / Math.sin(Math.PI / 6);
    var r4 = side / Math.sin(Math.PI / 4);
    var h6 = r6 * cos(Math.PI / 6);
    var h4 = r4 * cos(Math.PI / 4);
    console.log("h4 : ", h4);

    var h = h12 + h4;
    var w = 2 * h12 + 4 * h6 + 2 * h4;
    var inc = h;

    var row = 0;
    for (var y = -h / 2; y < height + h / 2; y += inc) {
      var startX = row % 2 == 0 ? -w : -w / 2;
      for (var x = startX; x < width; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }
  };
}

function build_poly(x, y, r, sides, init_angle) {
  p = new Polygon(sides);
  if (!init_angle) init_angle = 0;

  var inc = (2 * Math.PI) / sides;
  for (var index = 0; index < sides; index++) {

    var θ = index * inc - inc / 2 + init_angle;
    var vX = x + r * Math.cos(θ);
    var vY = y + r * Math.sin(θ);
    p.addVertex(vX, vY);
  }
  p.close();
  return p;
}
