import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePaxisAuth, getDashboardPath } from "@/contexts/PaxisAuthContext";
import { Loader2, Globe } from "lucide-react";

export default function DashboardRouter() {
  const { user, isLoading } = usePaxisAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      const dashboardPath = getDashboardPath(user.archetype);
      navigate(dashboardPath, { replace: true });
    } else if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Loading your peace dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}
