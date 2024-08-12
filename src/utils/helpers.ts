export const calculateWPM = (text: string, timeInMinutes: number): number => {
  const words = text.split(" ").length
  return Math.round(words / timeInMinutes || 0)
}

export const calculateErrors = (text: string, input: string): number => {
  const textArray = text.split("")
  const inputArray = input.split("")
  let errors = 0

  for (let i = 0; i < textArray.length; i++) {
    if (inputArray[i] !== textArray[i]) {
      errors++
    }
  }
  return errors
}
