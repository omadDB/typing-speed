import { useSelector } from "react-redux"
import { RootState } from "../store"

// В дальнейшем если будут множество слайсов, удобно пользоваться
export const useAppSelector = useSelector.withTypes<RootState>()
