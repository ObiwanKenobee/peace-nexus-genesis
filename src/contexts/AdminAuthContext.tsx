import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "moderator";
  permissions: string[];
  lastLogin: Date;
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

// Mock admin users for demo (in production, this would come from backend)
const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@paxis.global",
    name: "PAXIS Admin",
    role: "super_admin",
    permissions: ["all"],
    lastLogin: new Date(),
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "2",
    email: "moderator@paxis.global",
    name: "Platform Moderator",
    role: "moderator",
    permissions: ["user_management", "content_moderation", "analytics_read"],
    lastLogin: new Date(),
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=32&h=32&fit=crop&crop=face",
  },
];

const rolePermissions = {
  super_admin: ["all"],
  admin: [
    "user_management",
    "seo_management",
    "platform_management",
    "global_settings",
    "security_management",
    "analytics_full",
  ],
  moderator: [
    "user_read",
    "user_update",
    "content_moderation",
    "analytics_read",
    "seo_read",
  ],
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("paxis_admin_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("paxis_admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication (in production, this would be a real API call)
    const adminUser = mockAdminUsers.find((u) => u.email === email);

    if (adminUser && password === "admin123") {
      // Mock password
      const userWithPermissions = {
        ...adminUser,
        permissions:
          adminUser.role === "super_admin"
            ? ["all"]
            : rolePermissions[adminUser.role],
        lastLogin: new Date(),
      };

      setUser(userWithPermissions);
      localStorage.setItem(
        "paxis_admin_user",
        JSON.stringify(userWithPermissions),
      );
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("paxis_admin_user");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes("all")) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const value: AdminAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
