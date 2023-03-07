import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { persistedStore, store } from './store/store'
import { App } from './App'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<GoogleOAuthProvider
		clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
	>
		<BrowserRouter>
			<ToastContainer />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistedStore}>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</GoogleOAuthProvider>
)
