import PublicRoute from '../routers/PublicRoute'
import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import NewR from '../routers/NewR';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <PublicRoute /> */}
          <NewR />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
