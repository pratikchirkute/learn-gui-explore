import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronDown, ChevronUp, Filter, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  actions?: string;
}

const userData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastLogin: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", lastLogin: "2024-01-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", status: "inactive", lastLogin: "2024-01-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "pending", lastLogin: "2024-01-12" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "active", lastLogin: "2024-01-13" },
  { id: 6, name: "Diana Davis", email: "diana@example.com", role: "User", status: "active", lastLogin: "2024-01-11" },
  { id: 7, name: "Edward Miller", email: "edward@example.com", role: "Manager", status: "inactive", lastLogin: "2024-01-09" },
  { id: 8, name: "Fiona Taylor", email: "fiona@example.com", role: "User", status: "pending", lastLogin: "2024-01-08" },
];

export const DataSection = () => {
  const [users, setUsers] = useState<User[]>(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handleUserAction = (action: string, userId: number) => {
    toast.info(`${action} action triggered for user ${userId}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "success",
      inactive: "secondary",
      pending: "warning"
    };
    return (
      <Badge 
        variant={variants[status as keyof typeof variants] as any}
        id={`status-${status}`}
        data-testid={`status-badge-${status}`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Data Display Elements</h2>
        <p className="text-muted-foreground">
          Practice with tables, lists, pagination, and data manipulation interfaces
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      <Card className="p-4">
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" id="breadcrumb-home" data-testid="breadcrumb-home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" id="breadcrumb-dashboard" data-testid="breadcrumb-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage id="breadcrumb-users" data-testid="breadcrumb-users">Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Card>

      {/* Search and Filters */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Search & Filter Controls</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              id="search-users"
              data-testid="search-input"
            />
          </div>

          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger id="filter-role" data-testid="role-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-testid="role-all">All Roles</SelectItem>
              <SelectItem value="admin" data-testid="role-admin">Admin</SelectItem>
              <SelectItem value="manager" data-testid="role-manager">Manager</SelectItem>
              <SelectItem value="user" data-testid="role-user">User</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger id="filter-status" data-testid="status-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-testid="status-all">All Status</SelectItem>
              <SelectItem value="active" data-testid="status-filter-active">Active</SelectItem>
              <SelectItem value="inactive" data-testid="status-filter-inactive">Inactive</SelectItem>
              <SelectItem value="pending" data-testid="status-filter-pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={() => {
              setSearchTerm("");
              setFilterRole("all");
              setFilterStatus("all");
              setSortField("name");
              setSortDirection("asc");
              setCurrentPage(1);
            }}
            variant="outline"
            id="reset-filters"
            data-testid="reset-filters"
          >
            Reset Filters
          </Button>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-foreground">User Management Table</h3>
          <div className="text-sm text-muted-foreground">
            Showing {paginatedUsers.length} of {sortedUsers.length} users
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table id="users-table" data-testid="users-table">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="font-semibold p-0 h-auto"
                    id="sort-name"
                    data-testid="sort-name"
                  >
                    Name
                    {sortField === "name" && (
                      sortDirection === "asc" ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="font-semibold p-0 h-auto"
                    id="sort-email"
                    data-testid="sort-email"
                  >
                    Email
                    {sortField === "email" && (
                      sortDirection === "asc" ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("role")}
                    className="font-semibold p-0 h-auto"
                    id="sort-role"
                    data-testid="sort-role"
                  >
                    Role
                    {sortField === "role" && (
                      sortDirection === "asc" ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("lastLogin")}
                    className="font-semibold p-0 h-auto"
                    id="sort-lastlogin"
                    data-testid="sort-lastlogin"
                  >
                    Last Login
                    {sortField === "lastLogin" && (
                      sortDirection === "asc" ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} id={`user-row-${user.id}`} data-testid={`user-row-${user.id}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span id={`user-name-${user.id}`} data-testid={`user-name-${user.id}`}>
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell id={`user-email-${user.id}`} data-testid={`user-email-${user.id}`}>
                    {user.email}
                  </TableCell>
                  <TableCell id={`user-role-${user.id}`} data-testid={`user-role-${user.id}`}>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell id={`user-status-${user.id}`} data-testid={`user-status-${user.id}`}>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell id={`user-lastlogin-${user.id}`} data-testid={`user-lastlogin-${user.id}`}>
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleUserAction("view", user.id)}
                        id={`view-user-${user.id}`}
                        data-testid={`view-user-${user.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleUserAction("edit", user.id)}
                        id={`edit-user-${user.id}`}
                        data-testid={`edit-user-${user.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleUserAction("delete", user.id)}
                        id={`delete-user-${user.id}`}
                        data-testid={`delete-user-${user.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination data-testid="pagination">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  id="prev-page"
                  data-testid="prev-page"
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                    id={`page-${page}`}
                    data-testid={`page-${page}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  id="next-page"
                  data-testid="next-page"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>

      {/* Card Grid Layout */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Card Grid Layout</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedUsers.slice(0, 6).map((user) => (
            <Card key={user.id} className="p-4 hover:shadow-lg transition-shadow" id={`user-card-${user.id}`} data-testid={`user-card-${user.id}`}>
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
              <div className="flex justify-between items-center">
                {getStatusBadge(user.status)}
                <Button size="sm" variant="outline" id={`card-action-${user.id}`} data-testid={`card-action-${user.id}`}>
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* List View */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">List View</h3>
        <div className="space-y-3">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              id={`list-item-${user.id}`}
              data-testid={`list-item-${user.id}`}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.email} • {user.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(user.status)}
                <Button size="sm" variant="ghost" id={`list-more-${user.id}`} data-testid={`list-more-${user.id}`}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};