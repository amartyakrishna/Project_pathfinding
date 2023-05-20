import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import {showPopUp} from "./Popupbox/popupbox.jsx";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";
import { astar, getnodesInShortestPathOrder } from "../algorithms/astar";


// Defining initial state of start and finish.

let row_max_length = 20;
let col_max_length = 50;

let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 30;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      topMessage: "",
      weight: 1,
      changeWeight: false,
      distanceToBeTraveled: 0,
    };
  }

  // Creating grid
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  // On pressing the mouse down
  handleMouseDown(row, col) {
    if (this.state.topMessage !== "") return;

    let newGrid = [];

    if (this.state.changeWeight) {
      newGrid = getNewGridWithWeightToggled(
        this.state.grid,
        row,
        col,
        this.state.weight
      );
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }

    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  // On entering the new node element.
  handleMouseEnter(row, col) {
    if (this.state.topMessage !== "") return;
    if (!this.state.mouseIsPressed) return;

    let newGrid = [];

    if (this.state.changeWeight) {
      newGrid = getNewGridWithWeightToggled(
        this.state.grid,
        row,
        col,
        this.state.weight
      );
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }

    this.setState({ grid: newGrid, mouseIsPressed: true });
  }
  handleMouseUp() {
    if (this.state.topMessage !== "") return;
    this.setState({ mouseIsPressed: false });
  }

 visualizedastar() {
  this.setState({ topMessage: "Developed by : Amartya_krishna" });
  const { grid } = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = astar(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getnodesInShortestPathOrder(finishNode);
  this.animatedastar(visitedNodesInOrder, nodesInShortestPathOrder);
}

animatedastar(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 1; i <= visitedNodesInOrder.length; i++) {
    // When we reach the last element in visitedNodesInOrder.
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        this.setState({ topMessage: "Shortest_Path" });
        this.animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }

    if (i === visitedNodesInOrder.length - 1) continue;
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if (node.isWeight) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visitedWeight";
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }
    }, 10 * i);
  }
}


  visualizedijkstra() {
    this.setState({ topMessage: "Developed by : Amartya krishna" });
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animatedijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animatedijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      // When we reach the last element in visitedNodesInOrder.
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.setState({ topMessage: "Shortest Path" });
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      if (i === visitedNodesInOrder.length - 1) continue;
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isWeight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visitedWeight";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  }


  animateShortestPath(nodesInShortestPathOrder) {
    let timeTaken = 0;
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (nodesInShortestPathOrder[i].isWeight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-path-weight";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-path";
        }
      }, 50 * i);
    }

    timeTaken =
      nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1].distance;
    this.setState({ distanceToBeTraveled: timeTaken });
  }

  weightChangeHandler = (event) => {
    this.setState({ weight: event.target.value });
  };

  pointChangeHandler = () => {
    if (this.notCorrect()) return; //To check if the provided value is suitable or not.

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = "node";
    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = "node";

    START_NODE_ROW = parseInt(document.getElementById("start_row").value);
    START_NODE_COL = parseInt(document.getElementById("start_col").value);
    FINISH_NODE_ROW = parseInt(document.getElementById("end_row").value);
    FINISH_NODE_COL = parseInt(document.getElementById("end_col").value);

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = "node node-finish";
  };

  notCorrect = () => {
    if (
      isNaN(parseInt(document.getElementById("start_row").value)) ||
      isNaN(parseInt(document.getElementById("start_col").value)) ||
      isNaN(parseInt(document.getElementById("end_row").value)) ||
      isNaN(parseInt(document.getElementById("end_col").value))
    )
      return true;

    if (
      parseInt(document.getElementById("start_row").value) > row_max_length ||
      parseInt(document.getElementById("start_col").value) > col_max_length
    )
      return true;
    if (
      parseInt(document.getElementById("start_row").value) < 0 ||
      parseInt(document.getElementById("start_col").value) < 0
    )
      return true;

    if (
      parseInt(document.getElementById("end_row").value) > row_max_length ||
      parseInt(document.getElementById("end_col").value) > col_max_length
    )
      return true;
    if (
      parseInt(document.getElementById("end_row").value) < 0 ||
      parseInt(document.getElementById("end_col").value) < 0
    )
      return true;

    return false;
  };

  toggleWeight = () => {
    const temp = this.state.changeWeight;
    this.setState({ changeWeight: !temp });
  };

  render() {
    const {
      grid,
      mouseIsPressed,
      topMessage,
      distanceToBeTraveled,
         } = this.state;

    let button_task = (
      <p className="btn" onClick={() => this.visualizedijkstra()}>
        Start Dijkstra Algorithm
      </p>
    
    );
    let button2_task = (
      <p className="btn" onClick={() => this.visualizedastar()}>
        Start Astar Algorithm
      </p>
    
    );

    if (topMessage === "Shortest Path") {
      button_task = (
        <h2
          className="btn"
          href="#"
          onClick={() => window.location.reload(false)}
        >
          Reset <br />
          Time : {distanceToBeTraveled}
          <small> [1 Block = 1 Time = 1 Weight]</small>
        </h2>
      );
    } else if(topMessage === "Shortest_Path"){
      button2_task = (
        <h2
          className="btn"
          href="#"
          onClick={() => window.location.reload(false)}
        >
          Reset <br />
          Time : {distanceToBeTraveled}
          <small> [1 Block = 1 Time = 1 Weight]</small>
        </h2>
      );
    }
    else if (topMessage === "Developed by : Amartya krishna") {
      button_task = <h3 className="running">Running...</h3>;
    }
    else if (topMessage === "Developed by : Amartya_krishna") {
      button2_task = <h3 className="running">Running...</h3>;
    }
    let changeWeightText = "False";

    if (this.state.changeWeight) changeWeightText = "True";

    let textBox = (
      <div className="textBox">
       

        <div className="startPointContainer">
          <label htmlFor="point">Source :</label>
          <input
            type="number"
            name="point"
            id="start_row"
            min="0"
            max={row_max_length - 1}
            onChange={this.pointChangeHandler}
            defaultValue="9"
          ></input>
          <input
            type="number"
            name="point"
            id="start_col"
            min="0"
            max={col_max_length - 1}
            onChange={this.pointChangeHandler}
            defaultValue="8"
          ></input>
        </div>

        <div className="endPointContainer">
          <label htmlFor="point">Destination :</label>
          <input
            type="number"
            name="point"
            id="end_row"
            min="0"
            max={row_max_length - 1}
            onChange={this.pointChangeHandler}
            defaultValue="9"
          ></input>
          <input
            type="number"
            name="point"
            id="end_col"
            min="0"
            max={col_max_length - 1}
            onChange={this.pointChangeHandler}
            defaultValue="21"
          ></input>
        </div>
        <div className="weightContainer">
          <label htmlFor="quantity">Set Weight : </label>

          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            onChange={this.weightChangeHandler}
            defaultValue="1"
          />

          <button onClick={this.toggleWeight}>{changeWeightText}</button>
        </div>

        <div className="buttonContainer">{button_task}</div>
        <div className="button2Container">{button2_task}</div>
      </div>
    );

    if (topMessage === "Developed by : Amartya krishna") {
      textBox = null;
    } else if (topMessage === "Developed by : Amartya_krishna") {
      textBox = null;
    } 
    else if (topMessage === "Shortest Path") {
      textBox = (
        <div
          className="buttonContainer"
          style={{ width: "30%", margin: "0 auto" }}
        >
          {button_task}
        </div>
        
      );
    }
    else if (topMessage === "Shortest_Path")
    {
      textBox = (
        <div
          className="buttonContainer"
          style={{ width: "30%", margin: "0 auto" }}
        >
          {button2_task}
        </div>
        
      );
    }
    return (
      <div className="pathfindingVisualizer">
        <div className="container">
          <div className="heading">
            <h2 onClick={showPopUp}>Shortest Path Visualization using Dijkstra's & Astar Algorithm</h2>
            <h2>{topMessage}</h2>
          </div>

          {textBox}

          <p>
           A* and Dijkstra Are Single Source Weighted Algorithms{" "}
            <span className="ref"></span>
          </p>
        </div>

        <div className="visualGridContainer">
          <div className="gridBox">
            <table className="grid" style={{ borderSpacing: "0" }}>
              <tbody>
                {grid.map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {row.map((node, nodeIndex) => {
                        const { isStart, isFinish, isWall, isWeight } = node; //Extracting from the node
                        return (
                          <Node
                            row={rowIndex}
                            col={nodeIndex}
                            key={rowIndex + "-" + nodeIndex}
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            isWeight={isWeight}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row, col) =>
                              this.handleMouseDown(row, col)
                            }
                            onMouseEnter={(row, col) =>
                              this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                          ></Node>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < row_max_length; row++) {
    const currentRow = [];
    for (let col = 0; col < col_max_length; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: false,
    previousNode: null,
    weight: 0,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = [...grid];
  const node = newGrid[row][col];
  const newNode = {
    ...node, 
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWeightToggled = (grid, row, col, weight) => {
  const newGrid = [...grid];
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    weight: parseInt(weight),
  };
  newGrid[row][col] = newNode;
  return newGrid;
};



 

