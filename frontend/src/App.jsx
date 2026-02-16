import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <AuthProvider>
                <AnimatedRoutes />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#1e1e2e',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                        },
                    }}
                />
            </AuthProvider>
        </Router>
    );
}

export default App;
