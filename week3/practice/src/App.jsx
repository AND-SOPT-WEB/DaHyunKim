import './App.css'
import Card from './components/Card'
import { members } from './data';

function App() {
  const name = "김다현";
  const age = "23";
  return (
    <>
      <Card name={name} age={age} />
    </>
  )
}

export default App
