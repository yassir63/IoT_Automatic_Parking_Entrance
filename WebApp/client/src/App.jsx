import PRouter from './routers/PRouter';
import { ContextProvider } from './components/ContextProvider';

function App() {
  

  return (
    <ContextProvider>
      <PRouter />
    </ContextProvider>
  )
}

export default App
