function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.end = p5.Vector.add(a, v);

  this.show = function () {
    colorMode(HSB);
    stroke(hankinHue % 360, 100, 100);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
  };
}
