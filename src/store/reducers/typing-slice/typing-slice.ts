import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { generate } from "random-words"
import { calculateErrors, calculateWPM } from "../../../utils/helpers"

interface IWords {
  text: string
  input: string
  isTyping: boolean
  timerValue: number
  errors: number
  wpm: number
  currentCharIndex: number
}

const initialState = <IWords>{
  text: generate(100).join(" "),
  input: "",
  isTyping: false,
  timerValue: 15,
  errors: 0,
  wpm: 0,
  currentCharIndex: 0,
}

// Слайс для всего функционала typing, как только пользователь выбирает время таймера и начинает печатать все символы добавляются в state.input, для моментального сравнения введенного текста со сгенерированным текстом(state.text) и для показа правильности или неправильности введенных символов в компоненте TextDisplay

const typingSlice = createSlice({
  name: "typing-slice",
  initialState,
  reducers: (create) => ({
    // Выполняется как только пользователь начинает печатать
    setInput: create.reducer((state, action: PayloadAction<string>) => {
      if (!state.isTyping) {
        state.isTyping = true
      }
      state.input = action.payload
      state.currentCharIndex = action.payload.length
    }),
    // Сеттер для установки времени таймера
    setTimerValue: create.reducer((state, action: PayloadAction<number>) => {
      state.timerValue = action.payload
      state.isTyping = false
      state.input = ""
      state.text = generate(100).join(" ")
    }),
    // Выполняется как только заканчивается время таймера, ведется расчёт wpm и errors с помощью функций с helpers.ts
    calculateResults: create.reducer((state) => {
      const timeInMinutes = state.timerValue / 60
      state.wpm = calculateWPM(state.input, timeInMinutes)
      state.errors = calculateErrors(state.text, state.input)
      state.isTyping = false
    }),
    // Выполняется при нажатии на кнопку рестарта
    resetInput: create.reducer((state) => {
      state.input = ""
      state.text = generate(100).join(" ")
      state.isTyping = false
      state.wpm = 0
      state.errors = 0
      state.currentCharIndex = 0
    }),
  }),
})

export const typingActions = typingSlice.actions
export const typingReducer = typingSlice.reducer
