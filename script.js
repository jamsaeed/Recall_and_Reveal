let score = 0
let timer = 60
let isChecking = false
let startGame = false
let timeDown
let rePlay = document.querySelector(".play-button")
let gameContainer = document.querySelector(".game-container")
let timeDisplay = document.querySelector(".counting-time")
let scoreDisplay = document.querySelector(".cards-score")
let matchedCards = []
//popup
let losePopUp = document.querySelector(".pop-container")
let winPopUp = document.querySelector(".pop-container2")
let losingScore = document.querySelector("#LosingMessage")
let winScore = document.querySelector("#message")
let playAgain = document.querySelector("#playAgain")
let losePlayAgain = document.querySelector("#loseplayAgain")

const memoryCard = [
  "./images/image0.jpeg",
  "./images/image0.jpeg",
  "./images/image1.jpeg",
  "./images/image1.jpeg",
  "./images/image2.jpeg",
  "./images/image2.jpeg",
  "./images/image3.jpeg",
  "./images/image3.jpeg",
  "./images/image4.jpeg",
  "./images/image4.jpeg",
]

//making a new function for shuffling cards.

let cards = []
let flippedCards = []
let shuffleCards = memoryCard.sort(() => Math.random() - 0.5)

for (let i = 0; i < shuffleCards.length; i++) {
  const container = document.createElement("div")
  container.classList.add("cards")
  const img = document.createElement("img")
  img.setAttribute("src", `./images/backimage.jpeg`)
  gameContainer.appendChild(container)
  container.appendChild(img)
  cards.push(img)

  cards[i].addEventListener("click", () => {
    //handle checking
    if (isChecking === true) {
      return // stop wait until checing is done
    }

    if (matchedCards.includes(img)) {
      return
    }
    // guard condition other wise get10 points for clicking the same card twice
    if (flippedCards.includes(img)) {
      return //stops and doesn't let clicking the same card twice
    }

    //Don’t allow flipping another card if two are already flipped.
    if (flippedCards.length >= 2) {
      return //stop should not flip more than two cards
    }

    if (!startGame) {
      startGame = true
      timeDown = setInterval(downCount, 1000)
    }

    img.setAttribute("src", `${shuffleCards[i]}`)

    console.log("clicked")
    flippedCards.push(img)

    if (flippedCards.length === 2) {
      isChecking = true // to check match
      //console.log(flippedCards)
      if (flippedCards[0].src === flippedCards[1].src) {
        score += 10
        scoreDisplay.innerText = score
        matchedCards.push(flippedCards[0])
        matchedCards.push(flippedCards[1])
        flippedCards = []
        isChecking = false // done checking match
        if (score === 50) {
          clearInterval(timeDown)
          isChecking = true
          setTimeout(() => {
            winning()
            // alert(`you woon! score ${score}`)
          }, 100)
        }
      } else {
        const [card0, card1] = flippedCards
        //They don't match - flip back after 500ms
        setTimeout(() => {
          card0.setAttribute("src", "./images/backimage.jpeg")
          card1.setAttribute("src", "./images/backimage.jpeg")
          isChecking = false
        }, 500)
        flippedCards = []
      }
      console.log("flippedCards after", flippedCards)
    }
  })
}

const downCount = () => {
  timeDisplay.innerText = timer

  if (timer === 0) {
    clearInterval(timeDown)
    isChecking = true
    setTimeout(() => {
      // alert('game over')
      losing()
    }, 100)
  } else {
    timer--
  }
}

//  timeDown = setInterval(downCount, 1000) this will make the time start even before playing

const reSet = () => {
  clearInterval(timeDown)
  timer = 60
  timeDisplay.innerText = timer
  timeDown = setInterval(downCount, 1000)
}

const reLoad = () => {
  let button = document.querySelector(".play-button")
  if (button) {
    document.location.reload()
  }
}

document.querySelector("#main-menu").addEventListener("click", () => {
  document.location.href = "index.html"
})

rePlay.addEventListener("click", () => {
  reSet()
  score = 0
  scoreDisplay.innerText = score

  flippedCards = []
  matchedCards = []
  isChecking = false
  startGame = false

  shuffleCards = memoryCard.sort(() => Math.random() - 0.5)

  cards.forEach((card, index) => {
    card.setAttribute("src", "./images/backimage.jpeg")
  })
})

// handle pop up

// handles winning pop up
const winning = () => {
  winPopUp.classList.add("show")
  winScore.innerText = `Your Score : ${score}`
}

// handles losing pop up
const losing = () => {
  losePopUp.classList.add("show")
  losingScore.innerText = `Your Score : ${score}`
}

const hidePopUp = () => {
  winPopUp.classList.remove("show")
  losePopUp.classList.remove("show")
}

playAgain.addEventListener("click", () => {
  hidePopUp()
  rePlay.click()
})

losePlayAgain.addEventListener("click", () => {
  hidePopUp()
  rePlay.click()
})

document.querySelector("#quit").addEventListener("click", () => {
  window.location.href = "index.html"
})
document.querySelector("#losingquit").addEventListener("click", () => {
  window.location.href = "index.html"
})
