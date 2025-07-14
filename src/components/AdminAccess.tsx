import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminAccess() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        asChild
        className="shadow-lg bg-gray-900 hover:bg-gray-800 text-white"
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
