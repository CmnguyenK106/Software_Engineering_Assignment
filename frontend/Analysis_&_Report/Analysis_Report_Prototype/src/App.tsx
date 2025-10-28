import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TaskAnalysis } from "./components/TaskAnalysis";
import { LearningDataCollection } from "./components/LearningDataCollection";
import { ReportExport } from "./components/ReportExport";
import { Bell, MessageSquare, Home, BookOpen, BarChart3, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Badge } from "./components/ui/badge";

type UserRole = "training-room" | "student-affairs" | "faculty";

interface RoleInfo {
  id: UserRole;
  name: string;
  description: string;
  permissions: string[];
}

const roles: RoleInfo[] = [
  {
    id: "training-room",
    name: "Training Room",
    description: "Access general reports and analytics",
    permissions: ["View General Reports", "Export General Data", "System Overview"],
  },
  {
    id: "student-affairs",
    name: "Student Affairs Office",
    description: "Monitor attendance and feedback",
    permissions: ["View Attendance Reports", "View Feedback Data", "Export Attendance Reports"],
  },
  {
    id: "faculty",
    name: "Faculty / Subject",
    description: "Track student learning progress",
    permissions: ["View Learning Progress", "Student Performance Analysis", "Export Progress Reports"],
  },
];

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>("training-room");
  const [activeTab, setActiveTab] = useState("home");

  const currentRoleInfo = roles.find((r) => r.id === currentRole)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-[#186AC7] text-white shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Navigation sections */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium">Tutor Support System</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "home" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab("course")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "course" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Course</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "analysis" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analysis</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-white/20 text-white">
                        {currentRoleInfo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {roles.map((role) => (
                    <DropdownMenuItem
                      key={role.id}
                      onClick={() => setCurrentRole(role.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{role.name}</span>
                        {currentRole === role.id && (
                          <Badge variant="default" className="bg-[#186AC7]">Active</Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Role Info Card */}
            <Card className="border-[#186AC7] border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#186AC7]">Welcome, {currentRoleInfo.name}</CardTitle>
                    <CardDescription>{currentRoleInfo.description}</CardDescription>
                  </div>
                  <Badge className="bg-[#186AC7]">{currentRoleInfo.name}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="text-[#186AC7]">Your Permissions</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentRoleInfo.permissions.map((permission, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <div className="w-2 h-2 bg-[#186AC7] rounded-full"></div>
                        <span className="text-sm">{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#186AC7]">
                <CardHeader>
                  <CardTitle>Analysis</CardTitle>
                  <CardDescription>
                    {currentRole === "training-room" && "View general system analytics"}
                    {currentRole === "student-affairs" && "Check attendance and feedback"}
                    {currentRole === "faculty" && "Monitor student performance"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#186AC7] hover:bg-[#145591]"
                    onClick={() => setActiveTab("analysis")}
                  >
                    Go to Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#186AC7]">
                <CardHeader>
                  <CardTitle>Data Collection</CardTitle>
                  <CardDescription>
                    {currentRole === "training-room" && "Manage system-wide data"}
                    {currentRole === "student-affairs" && "Track attendance records"}
                    {currentRole === "faculty" && "View student learning data"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#186AC7] hover:bg-[#145591]"
                    onClick={() => setActiveTab("analysis")}
                  >
                    View Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#186AC7]">
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    {currentRole === "training-room" && "Generate general reports"}
                    {currentRole === "student-affairs" && "Export attendance reports"}
                    {currentRole === "faculty" && "Export progress reports"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#186AC7] hover:bg-[#145591]"
                    onClick={() => setActiveTab("analysis")}
                  >
                    Create Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Students</CardDescription>
                  <CardTitle className="text-[#186AC7]">1,234</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Courses</CardDescription>
                  <CardTitle className="text-[#186AC7]">48</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>
                    {currentRole === "training-room" && "Reports Generated"}
                    {currentRole === "student-affairs" && "Attendance Rate"}
                    {currentRole === "faculty" && "Average Score"}
                  </CardDescription>
                  <CardTitle className="text-[#186AC7]">
                    {currentRole === "training-room" && "156"}
                    {currentRole === "student-affairs" && "92%"}
                    {currentRole === "faculty" && "85%"}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-[#186AC7]">+12%</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "course" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#186AC7]">Course Management</CardTitle>
                <CardDescription>Manage courses and student enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <LearningDataCollection />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">
            <Tabs defaultValue="task-analysis" className="w-full">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="task-analysis">
                  {currentRole === "training-room" && "General Analysis"}
                  {currentRole === "student-affairs" && "Attendance & Feedback"}
                  {currentRole === "faculty" && "Learning Progress"}
                </TabsTrigger>
                <TabsTrigger value="data">Data Collection</TabsTrigger>
                <TabsTrigger value="reports">Export Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="task-analysis" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#186AC7]">
                      {currentRole === "training-room" && "General System Report"}
                      {currentRole === "student-affairs" && "Attendance & Feedback Analysis"}
                      {currentRole === "faculty" && "Student Learning Progress"}
                    </CardTitle>
                    <CardDescription>
                      {currentRole === "training-room" && "Overview of system-wide performance metrics and analytics"}
                      {currentRole === "student-affairs" && "Student attendance records and feedback results"}
                      {currentRole === "faculty" && "Track and analyze student learning progress and performance"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TaskAnalysis />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#186AC7]">Learning Data Collection</CardTitle>
                    <CardDescription>
                      {currentRole === "training-room" && "Manage system-wide student data"}
                      {currentRole === "student-affairs" && "Track attendance and feedback data"}
                      {currentRole === "faculty" && "View and manage student learning data"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LearningDataCollection />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#186AC7]">
                      {currentRole === "training-room" && "Export General Reports"}
                      {currentRole === "student-affairs" && "Export Attendance Reports"}
                      {currentRole === "faculty" && "Export Progress Reports"}
                    </CardTitle>
                    <CardDescription>
                      {currentRole === "training-room" && "Generate and export comprehensive system reports"}
                      {currentRole === "student-affairs" && "Generate and export attendance and feedback reports"}
                      {currentRole === "faculty" && "Generate and export student progress reports"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReportExport />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
