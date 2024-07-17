import PublicRoute from '../routers/PublicRoute'
import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NewR from '../routers/NewR';

function App() {

  return (
    <>
      <Provider store={store}>
        {/* <PublicRoute /> */}
        <NewR />
      </Provider>
    </>
  )
}

export default App
