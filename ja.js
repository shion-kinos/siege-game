let world = document.querySelector("#world");
let context = world.getContext("2d");
context.imageSmoothingEnabled = false;
let world_i = 128;
let world_j = 128;
let tileSize = 4;


document.querySelector("#game").addEventListener('mousedown', () => {
  if (event.detail > 1) {
    event.preventDefault();
  }
});


let textures = {
  ground: "textures/dirt.png",
  wall: "textures/stone_brick.png",
  deadBush: "textures/dead_bush.png",
  wheat_0: "textures/wheat_0.png",
  wheat_1: "textures/wheat_1.png",
  wheat_2: "textures/wheat_2.png",
  wheat_3: "textures/wheat_3.png",
}

let images = {};
(() => {
  let numImages = Object.keys(textures).length;
  let loaded = 0;
  for (let i in textures) {
    images[i] = new Image();
    images[i].src = textures[i];
    images[i].onload = () => {
      loaded += 1;
      if (loaded === numImages) {
        startGame();
      }
    };
  }
})();


function drawTile(tile, i, j) {
  context.drawImage(tile, j * tileSize, i * tileSize, tileSize, tileSize);
}
function clearTile(i, j) {
  context.clearRect(j * tileSize, i * tileSize, tileSize, tileSize);
}


var map = [];


function startGame() {
  for (let i = 0; i < world_i; i++) {
    map.push([]);
    for (let j = 0; j < world_j; j++) {
      map[i].push('ground');
      drawTile(images.ground, i, j);
    }
  }
  for (let i = 48; i < 80; i++) {
    for (let j = 48; j < 80; j++) {
      map[i][j] = 'deadBush';
      drawTile(images.deadBush, i, j);
    }
  }
  drawGraph();
}


function drawGraph() {
  context.beginPath();
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i][1].length; j++) {
      context.moveTo(graph[i][0][1] * tileSize, graph[i][0][0] * tileSize);
      context.lineTo(graph[i][1][j][0][1] * tileSize, graph[i][1][j][0][0] * tileSize);
    }
  }
  context.stroke();
  context.strokeStyle = "#00FF00";
  for (let i = 0; i < graph.length; i++) {
    drawTile(images.wheat_3, graph[i][0][0], graph[i][0][1]);
  }
  context.beginPath();
  context.moveTo(path[0].coords[1] * tileSize, path[0].coords[0] * tileSize);
  for (let i = 1; i < path.length; i++) {
    context.lineTo(path[i].coords[1] * tileSize, path[i].coords[0] * tileSize);
  }
  context.stroke();
}
