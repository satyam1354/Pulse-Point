// import { Container } from "postcss"
import Container from './components/Container'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
      {/* <div className='bg-red-200'>
        hellohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh authors
        </div> */}
        <Container/>
        <Toaster/>
    </>
  )
}

export default App
