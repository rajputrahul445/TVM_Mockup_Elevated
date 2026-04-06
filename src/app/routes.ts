import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { TypecodeVoucherManagement } from './pages/TypecodeVoucherManagement';
import { TypecodeVoucherManagement2 } from './pages/TypecodeVoucherManagement2';
import { CreateNewTV } from './pages/CreateNewTV';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/typecode-voucher-management',
    Component: TypecodeVoucherManagement,
  },
  {
    path: '/typecode-voucher-management-2',
    Component: TypecodeVoucherManagement2,
  },
  {
    path: '/create-new-TV',
    Component: CreateNewTV,
  },
]);