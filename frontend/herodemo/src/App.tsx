import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UniversityLogin } from './components/LoginPage';
import { StudentDashboard } from './components/dashboard/student-dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UniversityLogin />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
