import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, Search, Filter, Eye } from "lucide-react";

const studentsData = [
  {
    id: 1,
    name: "Alice Johnson",
    grade: "10th",
    avgScore: 92,
    attendance: 95,
    tasksCompleted: 48,
    totalTasks: 50,
    strengths: "Math, Science",
    weaknesses: "History",
    lastActive: "2025-10-11"
  },
  {
    id: 2,
    name: "Bob Smith",
    grade: "9th",
    avgScore: 78,
    attendance: 88,
    tasksCompleted: 35,
    totalTasks: 45,
    strengths: "Art, English",
    weaknesses: "Math",
    lastActive: "2025-10-10"
  },
  {
    id: 3,
    name: "Carol Davis",
    grade: "11th",
    avgScore: 88,
    attendance: 92,
    tasksCompleted: 52,
    totalTasks: 55,
    strengths: "English, History",
    weaknesses: "Science",
    lastActive: "2025-10-12"
  },
  {
    id: 4,
    name: "David Lee",
    grade: "10th",
    avgScore: 85,
    attendance: 90,
    tasksCompleted: 44,
    totalTasks: 50,
    strengths: "Science, Math",
    weaknesses: "Art",
    lastActive: "2025-10-11"
  },
  {
    id: 5,
    name: "Emma Wilson",
    grade: "12th",
    avgScore: 95,
    attendance: 98,
    tasksCompleted: 58,
    totalTasks: 60,
    strengths: "All subjects",
    weaknesses: "None",
    lastActive: "2025-10-12"
  },
];

export function LearningDataCollection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9th">9th Grade</SelectItem>
              <SelectItem value="10th">10th Grade</SelectItem>
              <SelectItem value="11th">11th Grade</SelectItem>
              <SelectItem value="12th">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#186AC7] hover:bg-[#145591]">
              <Plus className="w-4 h-4 mr-2" />
              Add Student Data
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student Learning Data</DialogTitle>
              <DialogDescription>
                Enter student information and learning metrics
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input id="name" placeholder="Enter student name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9th">9th Grade</SelectItem>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="11th">11th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="avgScore">Average Score</Label>
                  <Input id="avgScore" type="number" placeholder="0-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendance">Attendance %</Label>
                  <Input id="attendance" type="number" placeholder="0-100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Input id="strengths" placeholder="e.g., Math, Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weaknesses">Areas for Improvement</Label>
                <Input id="weaknesses" placeholder="e.g., History" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional observations..." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#186AC7] hover:bg-[#145591]">Save Student Data</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Learning Data</CardTitle>
          <CardDescription>
            Comprehensive overview of student performance and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Tasks Progress</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{student.avgScore}%</span>
                      {student.avgScore >= 90 && (
                        <Badge variant="default" className="bg-green-600">Excellent</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">
                        {student.tasksCompleted}/{student.totalTasks}
                      </span>
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div
                          className="bg-[#186AC7] h-2 rounded-full"
                          style={{
                            width: `${(student.tasksCompleted / student.totalTasks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {student.lastActive}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Student Details - {student.name}</DialogTitle>
                          <DialogDescription>Detailed learning profile</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Grade</Label>
                              <p>{student.grade}</p>
                            </div>
                            <div>
                              <Label>Average Score</Label>
                              <p>{student.avgScore}%</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Attendance</Label>
                              <p>{student.attendance}%</p>
                            </div>
                            <div>
                              <Label>Tasks Completed</Label>
                              <p>{student.tasksCompleted}/{student.totalTasks}</p>
                            </div>
                          </div>
                          <div>
                            <Label>Strengths</Label>
                            <p>{student.strengths}</p>
                          </div>
                          <div>
                            <Label>Areas for Improvement</Label>
                            <p>{student.weaknesses}</p>
                          </div>
                          <div>
                            <Label>Last Active</Label>
                            <p>{student.lastActive}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
