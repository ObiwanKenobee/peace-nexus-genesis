import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  MapPin,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator" | "user" | "peace_builder";
  status: "active" | "inactive" | "suspended";
  lastLogin: Date;
  createdAt: Date;
  location?: string;
  avatar?: string;
  permissions: string[];
  peaceCoinBalance: number;
  contributionScore: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Wild Panther",
    email: "wildpanther@paxis.global",
    role: "super_admin",
    status: "active",
    lastLogin: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-01-01T00:00:00"),
    location: "Global",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    permissions: ["all"],
    peaceCoinBalance: 10000,
    contributionScore: 100,
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@peacekeeping.org",
    role: "peace_builder",
    status: "active",
    lastLogin: new Date("2024-01-14T15:45:00"),
    createdAt: new Date("2023-06-15T00:00:00"),
    location: "South Sudan",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=40&h=40&fit=crop&crop=face",
    permissions: ["conflict_resolution", "community_building"],
    peaceCoinBalance: 2500,
    contributionScore: 87,
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@ngo.palestine",
    role: "moderator",
    status: "active",
    lastLogin: new Date("2024-01-13T09:20:00"),
    createdAt: new Date("2023-09-20T00:00:00"),
    location: "Palestine",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    permissions: ["content_moderation", "user_support"],
    peaceCoinBalance: 1800,
    contributionScore: 75,
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    email: "maria@mediation.colombia",
    role: "user",
    status: "active",
    lastLogin: new Date("2024-01-12T14:10:00"),
    createdAt: new Date("2023-11-10T00:00:00"),
    location: "Colombia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    permissions: ["basic_access"],
    peaceCoinBalance: 450,
    contributionScore: 42,
  },
  {
    id: "5",
    name: "Dr. Kwame Nkrumah",
    email: "kwame@peace.ghana",
    role: "peace_builder",
    status: "suspended",
    lastLogin: new Date("2024-01-05T08:15:00"),
    createdAt: new Date("2023-04-22T00:00:00"),
    location: "Ghana",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    permissions: ["conflict_resolution"],
    peaceCoinBalance: 890,
    contributionScore: 55,
  },
];

const roles = [
  {
    value: "super_admin",
    label: "Super Admin",
    color: "bg-red-100 text-red-800",
  },
  { value: "admin", label: "Admin", color: "bg-purple-100 text-purple-800" },
  {
    value: "moderator",
    label: "Moderator",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "peace_builder",
    label: "Peace Builder",
    color: "bg-green-100 text-green-800",
  },
  { value: "user", label: "User", color: "bg-gray-100 text-gray-800" },
];

const permissions = [
  "all",
  "user_management",
  "content_moderation",
  "conflict_resolution",
  "community_building",
  "user_support",
  "basic_access",
  "seo_management",
  "platform_management",
  "analytics_full",
  "analytics_read",
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    return (
      roles.find((r) => r.value === role)?.color || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: newStatus as User["status"] }
          : user,
      ),
    );
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole as User["role"] } : user,
      ),
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles
                      .filter((role) => role.value !== "super_admin")
                      .map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Users ({filteredUsers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-4">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {user.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Last login: {user.lastLogin.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            PeaceCoin: {user.peaceCoinBalance}
                          </span>
                          <span className="text-xs text-gray-500">
                            Score: {user.contributionScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getRoleColor(user.role)}>
                        {roles.find((r) => r.value === user.role)?.label}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user.id, "suspended")
                              }
                              className="text-red-600"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(user.id, "active")
                              }
                              className="text-green-600"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.value}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{role.label}</span>
                    <Badge className={role.color}>
                      {users.filter((u) => u.role === role.value).length} users
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Permissions:</h4>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center justify-between"
                        >
                          <Label
                            htmlFor={`${role.value}-${permission}`}
                            className="text-sm"
                          >
                            {permission.replace("_", " ").toUpperCase()}
                          </Label>
                          <Switch
                            id={`${role.value}-${permission}`}
                            defaultChecked={
                              role.value === "super_admin" ||
                              (role.value === "admin" &&
                                permission !== "all") ||
                              (role.value === "moderator" &&
                                [
                                  "content_moderation",
                                  "user_support",
                                  "basic_access",
                                ].includes(permission)) ||
                              (role.value === "peace_builder" &&
                                [
                                  "conflict_resolution",
                                  "community_building",
                                  "basic_access",
                                ].includes(permission)) ||
                              (role.value === "user" &&
                                permission === "basic_access")
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Wild Panther",
                    action: "Updated user permissions for Maria Rodriguez",
                    time: "2 minutes ago",
                    type: "permission",
                  },
                  {
                    user: "Ahmed Hassan",
                    action: "Suspended user account for spam",
                    time: "15 minutes ago",
                    type: "moderation",
                  },
                  {
                    user: "Dr. Sarah Chen",
                    action: "Created new peace-building project",
                    time: "1 hour ago",
                    type: "creation",
                  },
                  {
                    user: "Maria Rodriguez",
                    action: "Earned 50 PeaceCoins for conflict mediation",
                    time: "2 hours ago",
                    type: "reward",
                  },
                  {
                    user: "System",
                    action: "Auto-backup completed successfully",
                    time: "6 hours ago",
                    type: "system",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {activity.action}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {activity.user}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
