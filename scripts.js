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
    }
  }

  return { update }
})();

const game = (() => {
  let turnCount = 2
  const playerX = Player("X")
  const playerO = Player("O")

  const currentPlayer = () => {
    if (turnCount % 2 === 0) {
      turnCount++
      return playerX
    } else {
      turnCount++
      return playerO
    }
  }

  return { currentPlayer }
})();

const displayController = (() => {
  const update = (id, symbol) => {
    const square = document.getElementById(`${id}`)
    square.textContent = symbol
  }

  // event handlers
  let boxes = document.querySelectorAll(".box")
  boxes.forEach(box => box.addEventListener("click", gameboard.update))

  return { update }
})();