import TextDisplay from "./TextDisplay"
import TextInput from "./TextInput"
import TimeFilter from "./TimeFilter"

export default function TypingSpeed() {
  return (
    <>
      <TimeFilter />
      <div className="relative">
        <TextDisplay />
        <TextInput />
      </div>
    </>
  )
}
