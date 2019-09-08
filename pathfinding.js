class Zombie {
  constructor(coords) {
    this.position = coords;
  }
}


function coordsEq(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}


let graph = [
  [[32, 32], [[[32, 96], 1], [[96, 32], 1], [[96, 96], 4]]],
  [[32, 96], [[[32, 32], 1], [[96, 32], 4], [[96, 96], 1]]],
  [[96, 32], [[[32, 32], 1], [[32, 96], 4], [[96, 96], 1]]],
  [[96, 96], [[[32, 32], 4], [[32, 96], 1], [[96, 32], 1]]]
]

let startCoords = [32, 32];
let endCoords = [96, 96];


class Node {
  constructor(previous, distance, coords) {
    this.previous = previous;
    this.distance = distance;
    this.coords = coords;
  }
}


let open = [];
let closed = [];

let currNode = new Node(null, 0, startCoords);
open[0] = currNode;

while (!coordsEq(currNode.coords, endCoords)) {
  let currVert = graph.find((element) => {
    return coordsEq(element[0], currNode.coords);
  });
  let neighbors = currVert[1];
  for (let i in neighbors) {
    let neighborNode = new Node(currNode.coords, currNode.distance + neighbors[i][1], neighbors[i][0]);
    if (closed.some((element) => {
      return coordsEq(element, neighborNode.coords);
    })) continue;
    let openNeighborIndex = open.findIndex((element) => {
      return coordsEq(element, neighborNode.coords);
    });
    if (typeof open[openNeighborIndex] !== "undefined") {
      if (open[openNeighborIndex].distance > neighborNode.distance) {
        open.splice(openNeighborIndex, 1);
      } else continue;
    }
    for (let j = 0; j < open.length; j++) {
      if (j === open.length - 1 && open[0].distance <= neighborNode.distance) {
        open.splice(open.length, 0, neighborNode);
        break;
      }
      if (open[j].distance > neighborNode.distance) {
        open.splice(j, 0, neighborNode);
        break;
      }
    }
  }
  open.splice(0, 1);
  closed.push(currNode);
  currNode = open[0];
}


let path = [];

let endNode = open[0];
path[0] = endNode;
while (!coordsEq(path[0].coords, startCoords)) {
  let prevNode = closed.find((element) => {
    return coordsEq(element.coords, path[0].previous);
  });
  path.splice(0, 0, prevNode);
}

console.log(path, endNode.distance);
