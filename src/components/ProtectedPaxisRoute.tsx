import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePaxisAuth, UserArchetype } from "@/contexts/PaxisAuthContext";
import { Loader2, Globe } from "lucide-react";

interface ProtectedPaxisRouteProps {
  children: React.ReactNode;
  requiredArchetype?: UserArchetype;
  requiredPermission?: string;
}

export default function ProtectedPaxisRoute({
  children,
  requiredArchetype,
  requiredPermission,
}: ProtectedPaxisRouteProps) {
  const { user, isLoading, hasPermission } = usePaxisAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (requiredArchetype && user.archetype !== requiredArchetype) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-4">
            This dashboard is designed for{" "}
            {requiredArchetype?.replace("_", " ")} users. Your current role is{" "}
            {user.archetype?.replace("_", " ")}.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors"
          >
            Go to Your Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Permission Required
          </h1>
          <p className="text-gray-600 mb-4">
            You don't have the required permission "{requiredPermission}" to
            access this resource.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors"
          >
            Go to Your Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
