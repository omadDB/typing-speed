import { useAppSelector } from "../../hooks/useAppSelector"
import { typingSelector } from "../../store/selectors"
import { useActions } from "../../hooks/useActions"

export default function TextInput() {
  const { text, input, currentCharIndex } = useAppSelector(typingSelector)
  const { setInput } = useActions()

  const handleInputChange = (e) => {
    const value = e.target.value
    const lastCharTyped = value.slice(-1)

    console.log(lastCharTyped)

    if (lastCharTyped === text[currentCharIndex]) {
      setInput(lastCharTyped)
    }
    // else if (lastCharTyped === "") {
    // setCurrentCharIndex(currentCharIndex - 1)
    // }
  }

  return (
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      autoFocus
      className="absolute top-0 left-0 w-full h-full text-transparent outline-none opacity-0 caret-white"
    />
  )
}
