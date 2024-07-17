import '../assets/css/index.css'
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import IndexRoute from '../routers/IndexRoute';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

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
