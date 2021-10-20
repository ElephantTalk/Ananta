var polys = [];

var angle = 10;
var delta = 10;

var tilingTypeSelect;
var gridCheck;

let song;
let playPauseButton;
let amp;
let fft;

let bgHue = 0;
let hankinHue = 180;

function preload() {
  song = loadSound("taksim-makam-improv-dance-uzzal.mp3");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  canvas.drop(gotFile);

  song.play();
  playPauseButton = createButton("Play");
  playPauseButton.mousePressed(togglePlay);
  amp = new p5.Amplitude();
  amp.toggleNormalize(true);
  fft = new p5.FFT();

  background(51);
  tilingTypeSelect = select("#tiling");
  tilingTypeSelect.changed(chooseTiling);
  gridCheck = select("#showGrid");
  chooseTiling();
}

function gotFile(file) {
  if (file.type === "audio") {
    song = loadSound(file, song.stop());
  } else {
    alert("Not an audio file!");
  }
}

function togglePlay() {
  if (!song.isPlaying()) {
    song.play();
    playPauseButton.html("Pause");
  } else {
    song.pause();
    playPauseButton.html("Play");
  }
}

function draw() {
  fft.analyze();
  colorMode(HSB);
  background(bgHue % 360, 100, 100);
  amp.smooth(0.9);
  angle = map(amp.getLevel(), 0, 1, 0, 90);
  //console.log(angle, amp.getLevel());

  fft.smooth(0.9);
  delta = map(fft.getEnergy("bass"), 0, 255, 0, 50);
  //console.log(delta, fft.getEnergy("bass"));

  for (var i = 0; i < polys.length; i++) {
    angle += Math.sin(i);
    delta += Math.sin(i);
    polys[i].hankin();
    polys[i].show();
  }
  bgHue++;
  hankinHue++;
}

function octSquareTiling() {
  var octSqTiles = new SquareOctagonTiling(50);
  octSqTiles.buildGrid();
  polys = octSqTiles.polys;
}

function hexTiling() {
  var hexTiles = new HexagonalTiling(50);
  hexTiles.buildGrid();
  polys = hexTiles.polys;
}

function hexTriangleSquareTiling() {
  var tiles = new HexaTriangleSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}

function squareTiling() {
  polys = [];
  var inc = height / 13;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function dodecaHexSquareTiling() {
  var tiles = new DodecaHexaSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}

function chooseTiling() {
  switch (tilingTypeSelect.value()) {
    case "4.8.8":
      octSquareTiling();
      break;
    case "square":
      squareTiling();
      break;
    case "hexagonal":
      hexTiling();
      break;
    case "dodeca_hex_square":
      dodecaHexSquareTiling();
      break;
    case "hexa_triangle_square":
      hexTriangleSquareTiling();
      break;
    default:
      hexTriangleSquareTiling();
      break;
  }
}
