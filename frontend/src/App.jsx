import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
    return (
        <Router>
            <AuthProvider>
                <AnimatedRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
