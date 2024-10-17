//React Router Dom
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//AuthGuard
import { AuthGuard } from './AuthGuard';

//Pages
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { Contacts } from '@/view/pages/Contacts';
import { Dashboard } from '../view/pages/Dashboard';

//Layouts
import { AuthLayout } from '../view/layouts/AuthLayout';
import { AppLayout } from '@/view/layouts/AppLayout';
import { CreditCards } from '@/view/pages/CreditCards';
import { InstallmentPurchases } from '@/view/pages/InstallmentPurchases';
import InDevelopment from '@/view/pages/InDevelopment';

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
            <Route path="/contacts" element={<InDevelopment />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route
              path="/installment-purchases"
              element={<InstallmentPurchases />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
