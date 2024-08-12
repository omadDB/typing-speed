import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"
import { useActions } from "../../hooks/useActions"
import React, { useEffect } from "react"

export default function TextInput({
  timeLeft,
  setTimeLeft,
}: {
  timeLeft: number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
}) {
  const { input, isTyping, wpm } = useAppSelector(typingSelector)
  const { setInput, calculateResults } = useActions()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((s) => s - 1)
      }, 1000)

      return () => clearInterval(countdown)
    }

    if (timeLeft === 0) {
      calculateResults()
    }
  }, [isTyping, timeLeft, setTimeLeft])

  return (
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      disabled={timeLeft === 0}
      autoFocus
      // Данный элемент наложен на TextDisplay с генерированным текстом, для того чтобы UX был хороший и было также интерактивно как у monkeytype.com
      className={`absolute top-0 left-0 w-full h-full text-transparent outline-none opacity-0 ${
        wpm ? "left-[9999px]" : ""
      }`}
    />
  )
}
