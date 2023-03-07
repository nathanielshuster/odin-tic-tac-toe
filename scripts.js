const Player = (symbol) => {
  this.symbol = symbol

  const getSymbol = () => {
    return symbol
  }

  return { getSymbol }
};

const gameboard = (() => {
  let gameArr = ["", "", "", "", "", "", "", "", ""]

  const update = (square, symbol) => {
    gameArr[parseInt(square)] = symbol
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
  const update = (e) => {
    const square = document.getElementById(`${e.target.id}`)
    const symbol = game.currentPlayer().getSymbol()
    square.textContent = symbol

    gameboard.update(square.id, symbol)
  }

  // event handlers
  let boxes = document.querySelectorAll(".box")
  boxes.forEach(box => box.addEventListener("click", update))

  return { update }
})();