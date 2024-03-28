import { useContext } from 'react'
import { GlobalContext } from '~/context/GlobalContextProvider'

const useWrite = () => useContext(GlobalContext)

export default useWrite