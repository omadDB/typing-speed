import { MdRestartAlt } from "react-icons/md"
import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"
import { useActions } from "../../hooks/useActions"

export default function TextDisplay({ onReset }: { onReset: () => void }) {
  const { text, input, wpm, errors } = useAppSelector(typingSelector)
  const { resetInput } = useActions()

  // Калькуляции для изменения цвета символов при вводе (красный - если неправильно, зелёный - если правильно)
  const renderedText = text.split("").map((char, index) => {
    let className = ""

    if (index < input.length) {
      if (input[index] === char) {
        className = "text-green-500"
      } else {
        className = "text-red-500"
      }
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    )
  })

  const handleRestart = () => {
    resetInput()
    onReset()
  }

  return (
    <div className="opacity-75 md:w-[600px] text-xl">
      {!wpm && renderedText}
      {/* После окончания времени таймера выводится экран с результатами */}
      {wpm ? (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 p-12 border-2 text-5xl border-[#686c70] rounded-xl">
            <div className="flex flex-col items-center gap-3 pr-0 sm:pr-12 border-r-0 sm:border-r-2  border-[#686c70]">
              <p className="text-[#888a8d]">WPM</p>
              <p className="text-7xl text-[#e2b714]">{wpm}</p>
            </div>
            <div className="flex flex-col items-center gap-3 pl-0 sm:pl-12">
              <p className="text-[#888a8d]">Errors</p>
              <p className="text-7xl text-[#dd3e4e]">{errors}</p>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="text-5xl text-[#8e9397] duration-200 cursor-pointer hover:text-[#edf1f5]"
          >
            <MdRestartAlt />
          </button>
        </div>
      ) : null}
    </div>
  )
}
