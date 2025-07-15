import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  Settings,
  Search,
  Users,
  BarChart3,
  Globe,
  Shield,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Platform Management",
    icon: Settings,
    href: "/admin/platform",
    description: "System configuration and platform settings",
  },
  {
    title: "SEO Engine",
    icon: Search,
    href: "/admin/seo",
    description: "Meta tags, keywords, and search optimization",
  },
  {
    title: "User Management",
    icon: Users,
    href: "/admin/users",
    description: "Manage users, roles, and permissions",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    description: "SEO metrics and platform analytics",
  },
  {
    title: "Global Settings",
    icon: Globe,
    href: "/admin/global",
    description: "Multilingual, geo-targeting, and CDN settings",
  },
  {
    title: "Security",
    icon: Shield,
    href: "/admin/security",
    description: "Authentication, authorization, and security logs",
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-lg transition-all duration-300 relative",
          sidebarOpen ? "w-80" : "w-16",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">PAXIS Admin</h1>
              <p className="text-sm text-gray-500">Platform Management</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors",
                  "hover:bg-gray-100 group",
                  isActive &&
                    "bg-blue-50 text-blue-700 border-l-4 border-blue-700",
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-blue-700" : "text-gray-500",
                  )}
                />

                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </div>
                  </div>
                )}

                {sidebarOpen && (
                  <ChevronRight
                    size={16}
                    className={cn(
                      "text-gray-400 group-hover:text-gray-600",
                      isActive && "text-blue-600",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-500">
              <div className="font-medium">PAXIS v1.0.0</div>
              <div>Peace Technology Stack</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {adminNavItems.find((item) =>
                  location.pathname.startsWith(item.href),
                )?.title || "Admin Dashboard"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {adminNavItems.find((item) =>
                  location.pathname.startsWith(item.href),
                )?.description || "Platform and system management"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">← Back to Platform</Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "AD"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
