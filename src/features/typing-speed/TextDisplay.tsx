import { useEffect } from "react"
import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"

export default function TextDisplay() {
  const { text, input, currentCharIndex } = useAppSelector(typingSelector)

  // Calculate renderedText directly in the component body
  const renderedText = text.split("").map((char, index) => (
    <span
      key={index}
      className={`${
        input[index] === char
          ? "text-green-500"
          : input[index] !== char && index < input.length
          ? "text-red-500"
          : ""
      } `}
    >
      {char}
    </span>
  ))

  return (
    <div className="opacity-75 w-[500px]">
      {renderedText}
      {/* 
      <span
        className="text-white bg-blue-500 caret"
        style={{
          position: "absolute",
          left: `${currentCharIndex * 8}px`,
          top: 0, // Adjust the `8px` based on your font size and spacing
        }}
      >
        |
      </span> */}
    </div>
  )
}
