import { Button } from "@/components/ui/button";
import { Settings, User, Heart, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

export default function AdminAccess() {
  const { user, isAuthenticated } = usePaxisAuth();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {/* PAXIS User Access */}
      {isAuthenticated && user ? (
        <Button
          asChild
          className="shadow-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white block"
          size="lg"
        >
          <Link to="/dashboard">
            <Heart className="w-5 h-5 mr-2" />
            My Dashboard
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          className="shadow-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white block"
          size="lg"
        >
          <Link to="/login">
            <User className="w-5 h-5 mr-2" />
            Join PAXIS
          </Link>
        </Button>
      )}

      {/* Admin Panel Access */}
      <Button
        asChild
        className="shadow-lg bg-gray-900 hover:bg-gray-800 text-white block"
        size="lg"
      >
        <Link to="/admin">
          <Settings className="w-5 h-5 mr-2" />
          Admin Panel
        </Link>
      </Button>
    </div>
  );
}
