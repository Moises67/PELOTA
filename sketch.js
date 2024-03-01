var hypnoticBall, database;
var position;


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  hypnoticBall = createSprite(250, 250, 10, 10);
  hypnoticBall.shapeColor = "red";
  var ballPosition = database.ref("ball/position");
  ballPosition.on("value",readPosition, showError);
}

function draw() {
  background("white ");

  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();

}

function writePosition(x, y) {
  database.ref("ball/position").set({
    "x": hypnoticBall.x + x,
    "y": hypnoticBall.y + y
  });

  //hypnoticBall.x = hypnoticBall.x + x;
  //hypnoticBall.y = hypnoticBall.y + y;
}

function readPosition(data) {
  position = data.val();
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError() {
  console.log("Error al escribir en la base de datos");
}
