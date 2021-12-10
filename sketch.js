var vaccines;
var viruses;
var syringe;
var MARGIN = 40;


function setup() {
  createCanvas(800, 600);


  syringe = createSprite(width/2, height*0.9, 10, 10);
  syringe.maxSpeed = 6;
  syringe.friction = 0.5;
  syringe.setCollider('circle', 0, 0, 20);

  
  viruses = new Group();
  vaccines = new Group();

  for(var i = 0; i<8; i++) {
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2+ 1000 * sin(radians(ang));
    createVirus(3, px, py);
  }
}


function createVirus(type, x, y) {
  var v = createSprite(x, y);
  //var img = loadImage('assets/asteroid'+floor(random(0, 3))+'.png');
  //a.addImage(img);
  v.setSpeed(2.5-(type/2), random(360));
  v.rotationSpeed = 0.5;
  //a.debug = true;
  //v.type = type;

  if(type == 2)
    v.scale = 0.6;
  if(type == 1)
    v.scale = 0.3;

  v.mass = 2+a.scale;
  v.setCollider('circle', 0, 0, 50);
  viruses.add(v);
  return v;
}

function asteroidHit(asteroid, bullet) {
  var newType = asteroid.type-1;

  if(newType>0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

  for(var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(particleImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.95;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
}
