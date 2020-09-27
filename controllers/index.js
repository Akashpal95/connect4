//Default State
let state = {
  connectTable: [[]],
  moveCount: 0,
  tableTop: [],
  hasStarted: false,
  row: 6,
  col: 7,
  playerMoves: {
    1: {
      i: [],
      j: []
    },
    2: {
      i: [],
      j: []
    }
  }
};

//Reset Function
let reset = () => {
  state.connectTable = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  state.moveCount = 0;
  state.tableTop = [0, 0, 0, 0, 0, 0, 0];
  state.hasStarted = true;
  state.playerMoves[1].i = [];
  state.playerMoves[2].i = [];
  state.playerMoves[1].j = [];
  state.playerMoves[2].j = [];
};

//Check if anyone won
let checkWin = () => {};

//Process coin drop
let dropCoin = (column, res) => {
    column  = parseInt(column);
  if (column < 0 || column >= state.col) {
    //Invalid
    return res.status(422).json({
      message: "Invalid"
    });
  }
  if (state.tableTop[column] >= state.row) {
    //Invalid
    return res.status(422).json({
      message: "Invalid"
    });
  }
  //It has a valid place to enter
  state.moveCount++;

  if (state.moveCount % 2 == 1) {
    state.connectTable[state.row - state.tableTop[column] - 1][column] = 1;
    state.playerMoves[1].i.push(state.row - state.tableTop[column] - 1);
    state.playerMoves[1].j.push(column);
  } else {
    state.connectTable[state.row - state.tableTop[column] - 1][column] = 2;
    state.playerMoves[2].i.push(state.row - state.tableTop[column] - 1);
    state.playerMoves[2].j.push(column);
  }

  state.tableTop[column]++;
  return res.status(200).json({
    message: "Valid"
  });
};
//Start game
let start = res => {
  //   console.log(req);
  console.log("Start");
  reset();
  return res.status(200).json({
    message: "READY!!"
  });
};

module.exports.processRequest = (req, res) => {
  //   console.log(req);
  let action = req.body.action.toLowerCase();
  console.log("processRequest -> action :", action);
  if (action == "start") {
    start(res);
  } else if (state.hasStarted) {
    dropCoin(action, res);
    console.table(state.connectTable);
    console.log(state.playerMoves[1].i.length);
    console.log(state.playerMoves[1].j.length);
    console.log("dropCoin ->  state.moveCount : ", state.moveCount);
  } else {
    return res.status(500).json({
      message: "Invalid"
    });
  }
};
