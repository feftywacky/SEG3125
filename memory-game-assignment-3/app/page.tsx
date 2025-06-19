"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Theme = "nature" | "ocean"
type Difficulty = "easy" | "medium" | "hard"
type GameState = "start" | "playing" | "completed"

interface GameCard {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
}

const themes = {
  nature: [
    "🌲",
    "🌸",
    "🍄",
    "🦋",
    "🌿",
    "🌺",
    "🍀",
    "🌻",
    "🌵",
    "🌾",
  ],
  ocean: [
    "🐠",
    "🐙",
    "🦈",
    "🐚",
    "🦀",
    "🐢",
    "🦑",
    "🐋",
    "🦭",
    "🐡",
  ],
}

const difficultySettings = {
  easy: { pairs: 6, gridCols: 4 },    // 6 pairs = 12 cards in 4x3 grid
  medium: { pairs: 8, gridCols: 4 },  // 8 pairs = 16 cards in 4x4 grid
  hard: { pairs: 12, gridCols: 6 },   // 12 pairs = 24 cards in 6x4 grid
}

export default function MemoryGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [selectedTheme, setSelectedTheme] = useState<Theme>("nature")
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy")
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [incorrectAttempts, setIncorrectAttempts] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isGameComplete, setIsGameComplete] = useState(false)

  const createCards = useCallback((theme: Theme, difficulty: Difficulty): GameCard[] => {
    const { pairs } = difficultySettings[difficulty]
    const themeImages = themes[theme].slice(0, pairs)
    const cardPairs = [...themeImages, ...themeImages]

    return cardPairs
      .map((image, index) => ({
        id: index, // Each card gets a unique ID based on its position
        image,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index })) // Reassign IDs after shuffle to ensure uniqueness
  }, [])

  const startGame = () => {
    const newCards = createCards(selectedTheme, selectedDifficulty)
    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setIncorrectAttempts(0)
    setStartTime(Date.now())
    setEndTime(0)
    setIsGameComplete(false)
    setGameState("playing")
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isMatched || flippedCards.includes(cardId)) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards
      // Get the current cards to check for match
      const currentCards = cards.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card))
      const firstCard = currentCards.find(card => card.id === firstId)
      const secondCard = currentCards.find(card => card.id === secondId)

      if (firstCard && secondCard && firstCard.image === secondCard.image) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card)),
          )
          setMatchedPairs((prev) => prev + 1)
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setIncorrectAttempts((prev) => prev + 1)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing" && startTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameState, startTime])

  // Game completion effect
  useEffect(() => {
    const totalPairs = difficultySettings[selectedDifficulty].pairs
    if (matchedPairs === totalPairs && matchedPairs > 0) {
      setEndTime(Date.now())
      setIsGameComplete(true)
      setTimeout(() => setGameState("completed"), 1000)
    }
  }, [matchedPairs, selectedDifficulty])

  const resetGame = () => {
    setGameState("start")
    setCards([])
    setFlippedCards([])
    setMatchedPairs(0)
    setIncorrectAttempts(0)
    setStartTime(0)
    setEndTime(0)
    setCurrentTime(0)
    setIsGameComplete(false)
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const calculateAccuracy = () => {
    const totalAttempts = matchedPairs + incorrectAttempts
    return totalAttempts > 0 ? Math.round((matchedPairs / totalAttempts) * 100) : 0
  }

  if (gameState === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Start Memory Exercise</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Theme</h2>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setSelectedTheme("nature")}
                  className={`px-8 py-3 rounded-full transition-all duration-200 ${
                    selectedTheme === "nature"
                      ? "bg-gray-600 hover:bg-gray-700 text-white ring-2 ring-purple-500 ring-offset-2"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Nature
                </Button>
                <Button
                  size="lg"
                  onClick={() => setSelectedTheme("ocean")}
                  className={`px-8 py-3 rounded-full transition-all duration-200 ${
                    selectedTheme === "ocean"
                      ? "bg-gray-600 hover:bg-gray-700 text-white ring-2 ring-purple-500 ring-offset-2"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Ocean
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Difficulty</h2>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  onClick={() => setSelectedDifficulty("easy")}
                  className={`px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedDifficulty === "easy"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400 ring-offset-2 scale-105"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Easy
                </Button>
                <Button
                  size="lg"
                  onClick={() => setSelectedDifficulty("medium")}
                  className={`px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedDifficulty === "medium"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white ring-2 ring-yellow-400 ring-offset-2 scale-105"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Medium
                </Button>
                <Button
                  size="lg"
                  onClick={() => setSelectedDifficulty("hard")}
                  className={`px-6 py-3 rounded-full transition-all duration-200 ${
                    selectedDifficulty === "hard"
                      ? "bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 ring-offset-2 scale-105"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Hard
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              onClick={startGame}
              className="px-12 py-4 rounded-full bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold mt-8"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "playing") {
    const { gridCols } = difficultySettings[selectedDifficulty]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 text-lg font-semibold text-gray-700">
            <div>Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}</div>
            <div className="text-center">
              <div className="text-blue-600 font-bold text-xl mb-2">
                Time: {formatTime(currentTime - startTime)}
              </div>
              <div className="text-purple-600">
                Matched: {matchedPairs}/{difficultySettings[selectedDifficulty].pairs}
              </div>
              {incorrectAttempts > 0 && <div className="text-red-600 font-bold text-xl">Incorrect Attempts: {incorrectAttempts}</div>}
            </div>
            <div>Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}</div>
          </div>

          {/* Game Grid */}
          <div
            className={`grid gap-4 justify-center mb-8`}
            style={{
              gridTemplateColumns: `repeat(${gridCols}, minmax(0, 120px))`,
              gridTemplateRows: `repeat(${Math.ceil(cards.length / gridCols)}, minmax(0, 120px))`,
              maxWidth: `${gridCols * 140}px`,
              margin: "0 auto",
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                className={`aspect-square cursor-pointer transition-all duration-300 hover:scale-105 ${
                  card.isMatched ? "ring-2 ring-green-400" : ""
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="w-full h-full flex items-center justify-center p-2">
                  {card.isFlipped || card.isMatched ? (
                    <div className="text-8xl select-none">
                      {card.image}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-blue-400 rounded flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded opacity-80 flex items-center justify-center">
                        <div className="text-blue-200 text-4xl">?</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-12">
            <Button onClick={resetGame} className="px-8 py-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white">
              Back to Start
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "completed") {
    const timeTaken = endTime - startTime
    const accuracy = calculateAccuracy()

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 text-lg font-semibold text-gray-700">
            <div>Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}</div>
            <div className="text-center">
              <div className="text-green-600 font-bold text-2xl">You completed the session</div>
            </div>
            <div>Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Stats */}
            <div className="lg:w-1/3 space-y-4 text-lg font-semibold text-gray-700">
              <div>Time taken: {formatTime(timeTaken)}</div>
              <div>Accuracy: {accuracy}%</div>
              <div>Matched pairs: {matchedPairs}</div>
              <div>Incorrect attempts: {incorrectAttempts}</div>

              <Button
                onClick={resetGame}
                className="px-8 py-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white mt-6"
              >
                Back to Home
              </Button>
            </div>

            {/* Final Grid */}
            <div className="lg:w-2/3">
              <div
                className={`grid gap-4 justify-center`}
                style={{
                  gridTemplateColumns: `repeat(${difficultySettings[selectedDifficulty].gridCols}, minmax(0, 120px))`,
                  gridTemplateRows: `repeat(${Math.ceil(cards.length / difficultySettings[selectedDifficulty].gridCols)}, minmax(0, 120px))`,
                  maxWidth: `${difficultySettings[selectedDifficulty].gridCols * 140}px`,
                  margin: "0 auto",
                }}
              >
                {cards.map((card) => (
                  <Card key={card.id} className="aspect-square ring-2 ring-green-400">
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <div className="text-8xl select-none">
                        {card.image}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
