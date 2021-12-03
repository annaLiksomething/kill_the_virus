var ghost;
function setup() {
  createCanvas(800, 400);
  createSprite(400, 200, 50, 50);
  ghost = createSprite(600, 200);
  ghost.addAnimation("normal", "assets/asterisk.png", "assets/asterisk.png");
}

function draw() {
  background(255, 255, 255);
  ghost.changeAnimation("normal");
  drawSprites();
}
