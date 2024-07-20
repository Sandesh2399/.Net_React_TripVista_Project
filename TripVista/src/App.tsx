import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.tsx'
import UserProfileUpdate from './components/UserProfileUpdate.tsx';

function App() {
	const routes = router();

	return (
		<>
			<RouterProvider router={routes} />
			<UserProfileUpdate />
		</>
	)
}

export default App
