import { useActions } from "../../hooks/useActions"
import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"

// Фильтр компонент для таймера
export default function TimeFilter() {
  const { timerValue } = useAppSelector(typingSelector)
  const { setTimerValue } = useActions()

  return (
    <div className="flex justify-center rounded-lg bg-[#2c2e31] px-3 text-[#646669]">
      <button
        className={`p-3 duration-150 cursor-pointer hover:text-white active:text-[#646669] ${
          timerValue === 15 ? "text-white" : ""
        }`}
        onClick={() => setTimerValue(15)}
      >
        15
      </button>
      <button
        className={`p-3 duration-150 cursor-pointer hover:text-white active:text-[#646669] ${
          timerValue === 30 ? "text-white" : ""
        }`}
        onClick={() => setTimerValue(30)}
      >
        30
      </button>
      <button
        className={`p-3 duration-150 cursor-pointer hover:text-white active:text-[#646669] ${
          timerValue === 60 ? "text-white" : ""
        }`}
        onClick={() => setTimerValue(60)}
      >
        60
      </button>
    </div>
  )
}
