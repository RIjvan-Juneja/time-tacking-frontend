import PublicRoute from '../routers/PublicRoute'
import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <PublicRoute />
      </Provider>
    </>
  )
}

export default App
