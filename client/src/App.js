import './App.css';
import ToDoApp from './pages/ToDoApp';
import AuthPage from './Auth/AuthPage';
import RequireAuth from '../src/Auth/RequireAuth'
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to={'auth/register'} replace/>}  />
        <Route path="/auth/:mode" element={<AuthPage />} />
        <Route 
          path="/todos"
          element={
            <RequireAuth>
              <ToDoApp />
            </RequireAuth>
          }
        />
      </Routes>
      <Toaster  
        position='top-center' 
        closeButton
        richColors
        expand={false}
        visibleToasts={1}
        theme="light"
      />
    </div>
  );
};

export default App;