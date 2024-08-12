// Расчет WPM
export const calculateWPM = (text: string, timeInMinutes: number): number => {
  const words = text.split(" ").length
  return Math.round(words / timeInMinutes || 0)
}

// Расчет ошибок
export const calculateErrors = (text: string, input: string): number => {
  const inputArray = input.split("")
  const textArray = text.slice(0, inputArray.length)
  let errors = 0

  for (let i = 0; i < textArray.length; i++) {
    if (inputArray[i] !== textArray[i]) {
      errors++
    }
  }

  console.log(errors)
  return errors
}
