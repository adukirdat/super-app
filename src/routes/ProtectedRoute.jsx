import { Navigate } from 'react-router-dom';
import useStore from '../store/useStore';

const ProtectedRoute = ({ children, requireCategories = false, requireDashboard = false }) => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);
  const hasVisitedDashboard = useStore((state) => state.hasVisitedDashboard);

  if (!user.username) {
    return <Navigate to="/" replace />;
  }

  if (requireCategories && selectedCategories.length < 3) {
    return <Navigate to="/categories" replace />;
  }

  if (requireDashboard && !hasVisitedDashboard) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
