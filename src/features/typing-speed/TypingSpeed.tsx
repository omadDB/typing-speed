import { useEffect, useState } from "react"
import TextDisplay from "./TextDisplay"
import TextInput from "./TextInput"
import TimeFilter from "./TimeFilter"
import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"

export default function TypingSpeed() {
  const { timerValue, isTyping, wpm } = useAppSelector(typingSelector)
  const [timeLeft, setTimeLeft] = useState(timerValue)

  useEffect(() => {
    setTimeLeft(timerValue)
  }, [timerValue])

  const handleReset = () => {
    setTimeLeft(timerValue)
  }

  return (
    <>
      {/* Когда пользователь начинает печатать фильтр исчезает и появляется отсчет */}
      {!isTyping && !wpm && <TimeFilter />}
      {isTyping && <p className="text-2xl ">{timeLeft}s</p>}
      <div className="relative overflow-hidden">
        <TextDisplay onReset={handleReset} />
        <TextInput timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      </div>
    </>
  )
}
