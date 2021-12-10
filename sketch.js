var vaccines;
var viruses;
var syringe;
var MARGIN = 40;

var vaccines;
var viruses;
var syringe;
var MARGIN = 40;
var syringeImage, virusImage;

function setup() {
  
  createCanvas(800, 600);
  fill(255);
  text(width/2)
  syringeImage = loadImage("https://cdn.glitch.me/070b9542-c4af-439a-a169-8bdbf7f0427e%2Fsyringe.png?v=1639107283062");
 
  syringe = createSprite(width / 2, height * 0.9, 10, 10);
  syringe.maxSpeed = 6;
  syringe.friction = 0.05;
  syringe.setCollider("circle", 0, 0, 20);

  syringe.addImage('normal', syringeImage);

  viruses = new Group();
  vaccines = new Group();

  for (var i = 0; i < 8; i++) {
    var ang = random(360);
    var px = width / 2 + 1000 * cos(radians(ang));
    var py = height / 2 + 1000 * sin(radians(ang));
    createVirus(3, px, py);
  }
}

function draw() {
  background(53, 120, 171);
  for (var i = 0; i < allSprites.length; i++) {
    var s = allSprites[i];
    if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
    if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
    if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
    if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
  }

  viruses.overlap(vaccines, vaccineShot);

  syringe.bounce(viruses);
  
  syringe.attractionPoint(0.2, mouseX, mouseY);


    syringe.rotation -= 0.005*mouseX;


  if (keyDown(UP_ARROW)) {
    syringe.addSpeed(1, syringe.rotation);
  }

  if (keyWentDown("x")) {
    var vaccine = createSprite(syringe.position.x, syringe.position.y, 5, 7);
    vaccine.setSpeed(10 + syringe.getSpeed(), syringe.rotation);
    vaccine.life = 30;
    vaccines.add(vaccine);
  }

  drawSprites();
}

function createVirus(type, x, y) {
  var v = createSprite(x, y, 50, 50);
  var img = loadImage("https://cdn.glitch.me/070b9542-c4af-439a-a169-8bdbf7f0427e%2Fvirus.png?v=1639107283062");
  
  v.addImage(img);
  v.setSpeed(2.5 - type / 2, random(360));
  v.rotationSpeed = 0.5;
  //a.debug = true;
  v.type = type;

  if (type == 2) v.scale = 0.6;
  if (type == 1) v.scale = 0.3;

  v.mass = 2 + v.scale;
  v.setCollider("circle", 0, 0, 50);
  viruses.add(v);
  return v;
}

function vaccineShot(virus, vaccine) {
  var newType = virus.type - 1;

  if (newType > 0) {
    createVirus(newType, virus.position.x, virus.position.y);
    createVirus(newType, virus.position.x, virus.position.y);
  }

  for (var i = 0; i < 10; i++) {
    var p = createSprite(vaccine.position.x, vaccine.position.y, 10, 10);
    //p.addImage(particleImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.05;
    p.life = 15;
  }

  vaccine.remove();
  virus.remove();
}
