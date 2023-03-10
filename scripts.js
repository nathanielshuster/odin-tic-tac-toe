const Player = (symbol) => {
  this.symbol = symbol

  const getSymbol = () => {
    return symbol
  }

  return { getSymbol }
};

const gameboard = (() => {
  let gameArr = ["", "", "", "", "", "", "", "", ""]

  const update = (e) => {
    const id = e.target.id
    const symbol = game.currentPlayer().getSymbol()

    if (gameArr[parseInt(id)] !== "") {
      return
    } else {
      gameArr[parseInt(id)] = symbol
      displayController.update(id, symbol)
      
      if (game.over()) {
        displayController.freezeBoard()
      } else {
        game.takeTurn()
      }
    }
  }

  const boardFull = () => {
    let outcome = true

    gameArr.forEach(position => {
      if (position === "") {
        outcome = false
      }
    })

    return outcome
  }

  return { update, boardFull, gameArr }
})();

const game = (() => {
  let turnCount = 2
  const playerX = Player("X")
  const playerO = Player("O")
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const currentPlayer = () => {
    if (turnCount % 2 === 0) {
      return playerX
    } else {
      return playerO
    }
  }

  const takeTurn = () => {
    turnCount++
  }

  const won = () => {
    let symbol = currentPlayer().getSymbol()
    let board = gameboard.gameArr
    let outcome = false

    winCombos.forEach(combo => {
      if (board[combo[0]] === symbol) {
        if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
          outcome = true
        }
      }
    })

    return outcome
  }

  const over = () => {
    if (gameboard.boardFull() || won()) {
      return true
    } else {
      return false
    }
  }

  return { currentPlayer, takeTurn, won, over }
})();

const displayController = (() => {
  // event handlers
  const boxes = document.querySelectorAll(".box")
  boxes.forEach(box => box.addEventListener("click", gameboard.update))

  const update = (id, symbol) => {
    const square = document.getElementById(`${id}`)
    square.textContent = symbol
  }

  const freezeBoard = () => {
    boxes.forEach(box => box.removeEventListener("click", gameboard.update))
  }

  return { update, freezeBoard }
})();