import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { generate } from "random-words"
import { ROWS, WORDS_PER_ROW } from "../../../utils/constants"
import { calculateErrors, calculateWPM } from "../../../utils/helpers"

interface IWords {
  text: string
  input: string
  startTime: Date | null
  endTime: Date | null
  errors: number
  wpm: number
  currentCharIndex: number
  currentRow: number
  rows: string[][]
}

const generateRows = (words: string[]) => {
  const rows: string[][] = []
  for (let i = 0; i < words.length; i += WORDS_PER_ROW) {
    rows.push(words.slice(i, i + WORDS_PER_ROW))
  }
  return rows
}

const initialState = <IWords>{
  text: generate(100).join(" "),
  input: "",
  startTime: null,
  endTime: null,
  errors: 0,
  wpm: 0,
  currentRow: 0,
  currentCharIndex: 0,
  rows: generateRows(generate(100)),
}

const typingSlice = createSlice({
  name: "typing-slice",
  initialState,
  reducers: (create) => ({
    setInput: create.reducer((state, action: PayloadAction<string>) => {
      if (!state.startTime) state.startTime = new Date()
      state.input = action.payload
      state.currentCharIndex = action.payload.length
    }),
    setEndTime: create.reducer((state) => {
      state.endTime = new Date()
      if (state.startTime) {
        const timeInMinutes =
          (state.endTime.getTime() - state.startTime.getTime()) / 1000 / 60
        state.wpm = calculateWPM(state.text, timeInMinutes)
        state.errors = calculateErrors(state.text, state.input)
      }
    }),
    // type: create.reducer((state, { payload }: PayloadAction<string>) => {
    //   state.input.push(payload)
    //   state.currentCharIndex += 1

    //   // // Check if the user has completed the current row
    //   // const typedWords = state.input.join("").split(" ")
    //   // const completedRows = Math.floor(typedWords.length / WORDS_PER_ROW)

    //   // if (completedRows >= ROWS) {
    //   //   state.currentRow = Math.min(
    //   //     state.currentRow + 1,
    //   //     state.rows.length - ROWS
    //   //   )
    //   // }
    //   // console.log(typedWords)
    //   // console.log(state.input)
    // }),
    resetInput: create.reducer((state) => {
      state.input = ""
      state.text = generate(100).join(" ")
    }),
  }),
})

export const typingActions = typingSlice.actions
export const typingReducer = typingSlice.reducer
