import { createBrowserRouter } from 'react-router-dom';
import ProtextedRoute from '../components/ProtectedRoute/ProtectedRoute';

import LoginPage from '../pages/LoginPage/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import DashboardLayout from '../layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: <ProtextedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  }
]);

export default router;
