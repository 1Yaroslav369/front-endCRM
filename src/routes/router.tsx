import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
//pages
import OrdersPage from '../pages/Orders/OrdersPage';
import ClientsPage from '../pages/Clients/ClientsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
//layout
import DashboardLayout from '../layouts/DashboardLayout';
//pages
import LeadsPage from '../pages/Leads/LeadsPage';
import OffersPage from '../pages/OffersPage/OffersPage';
import FinancePage from '../pages/Finance/FinancePage';
import InstalationPage from '../pages/Installation/InstallationPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ClientDetails from '../pages/ClientDetails/ClientDetails';
import NewOrderPage from '../pages/NewOrderPage/NewOrder';
import NewOfferPage from '../pages/NewOfferPage/NewOfferPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,

        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'leads',
            element: <LeadsPage />,
          },
          {
            path: 'offers',
            element: <OffersPage />,
          },
          {
            path: 'offers/new',
            element: <NewOfferPage />,
          },
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          //потом поменять на  orderDetails
          {
            path: 'orders/:id',
            element: <OrdersPage />,
          },
          //
          {
            path: '/orders/new',
            element: <NewOrderPage />,
          },
          {
            path: 'finance',
            element: <FinancePage />,
          },
          {
            path: 'installation',
            element: <InstalationPage />,
          },
          {
            path: 'clients',
            element: <ClientsPage />,
          },
          {
            path: 'clients/:id',
            element: <ClientDetails />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
export default router;
