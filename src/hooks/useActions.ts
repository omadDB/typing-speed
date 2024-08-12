import { bindActionCreators } from "@reduxjs/toolkit"
import { AllActionCreators } from "../store/action-creators"
import { useAppDispatch } from "./useAppDispatch"

// Централизация всех actions
export const useActions = () => {
  const dispatch = useAppDispatch()

  return bindActionCreators(AllActionCreators, dispatch)
}
