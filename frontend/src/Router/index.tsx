//React
import { lazy, Suspense } from 'react';

//React Router Dom
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';

//AuthGuard
import { AuthGuard } from './AuthGuard';

/* //Pages
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { Contacts } from '@/view/pages/Contacts';
import { Dashboard } from '../view/pages/Dashboard'; 
import { InstallmentPurchases } from '@/view/pages/InstallmentPurchases';
import InDevelopment from '@/view/pages/InDevelopment';*/

//Layouts
import { AuthLayout } from '../view/layouts/AuthLayout';
import { AppLayout } from '@/view/layouts/AppLayout';
import { CreditCards } from '@/view/pages/CreditCards';
import LoadingScreen from '@/view/components/LoadingScreen';
import { ErrorBoundaryFallback } from '@/view/components/ErrorBoundaryFallback';
import { ErrorBoundary } from '@/view/components/ErrorBoundary';

const Login = lazy(() => import('../view/pages/Login'));
const Register = lazy(() => import('../view/pages/Register'));
const Dashboard = lazy(() => import('../view/pages/Dashboard'));
const InstallmentPurchases = lazy(
  () => import('../view/pages/InstallmentPurchases')
);
const InDevelopment = lazy(() => import('../view/pages/InDevelopment'));

function RouterErrorBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <Outlet />
    </ErrorBoundary>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<AppLayout />}>
              <Route element={<RouterErrorBoundary />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<InDevelopment />} />
                <Route path="/credit-cards" element={<CreditCards />} />
                <Route
                  path="/installment-purchases"
                  element={<InstallmentPurchases />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
