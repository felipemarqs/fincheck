//React Router Dom
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//AuthGuard
import { AuthGuard } from './AuthGuard';

//Pages
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { Dashboard } from '../view/pages/Dashboard copy';
import { Dashboard as OldDashboard } from '../view/pages/Dashboard';

//Layouts
import { AuthLayout } from '../view/layouts/AuthLayout';
import { AppLayout } from '@/view/layouts/AppLayout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="/test" element={<OldDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
