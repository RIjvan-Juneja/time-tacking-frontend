import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import IndexRoute from '../routers/IndexRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from '../ contexts/SocketProvider';
import { socket } from '../common/helper/socket';
import { useEffect } from 'react';


function App() {

  useEffect(()=>{
    socket.connect()
  },[])

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <IndexRoute />
          </SocketProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
