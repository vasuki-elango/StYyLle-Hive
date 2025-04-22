import { Allroutes } from './Allroutes';
import { CardContext } from './Context/CardContext'

function App() {
  return (
    <CardContext className="min-h-screen">
      <Allroutes/>
    </CardContext>
  );
}

export default App;
