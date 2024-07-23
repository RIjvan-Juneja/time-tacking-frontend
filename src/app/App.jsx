import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import IndexRoute from '../routers/IndexRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { socket } from '../common/helper/socket';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    socket.connect()
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndexRoute />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
