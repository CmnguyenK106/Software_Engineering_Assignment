import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, Clock, MapPin, Users, BookOpen, Link as LinkIcon } from "lucide-react";

interface ClassData {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  subject: string;
  maxStudents: number;
  currentStudents: number;
  location: string;
  link: string;
}

export function TutorClassSetup() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: "1",
      date: new Date(2025, 9, 12),
      startTime: "10:00",
      endTime: "11:30",
      subject: "Mathematics",
      maxStudents: 15,
      currentStudents: 8,
      location: "Room 301",
      link: "https://meet.example.com/math-101"
    },
    {
      id: "2",
      date: new Date(2025, 9, 15),
      startTime: "14:00",
      endTime: "15:30",
      subject: "Physics",
      maxStudents: 12,
      currentStudents: 12,
      location: "Lab A",
      link: "https://meet.example.com/physics-201"
    },
    {
      id: "3",
      date: new Date(2025, 9, 18),
      startTime: "09:00",
      endTime: "10:30",
      subject: "Chemistry",
      maxStudents: 10,
      currentStudents: 5,
      location: "Online",
      link: "https://meet.example.com/chem-101"
    }
  ]);

  const [newClass, setNewClass] = useState({
    date: "",
    startTime: "",
    endTime: "",
    subject: "",
    maxStudents: "",
    location: "",
    link: ""
  });

  const handleCreateClass = () => {
    const classData: ClassData = {
      id: Date.now().toString(),
      date: new Date(newClass.date),
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      subject: newClass.subject,
      maxStudents: parseInt(newClass.maxStudents),
      currentStudents: 0,
      location: newClass.location,
      link: newClass.link
    };
    
    setClasses([...classes, classData]);
    setIsDialogOpen(false);
    setNewClass({
      date: "",
      startTime: "",
      endTime: "",
      subject: "",
      maxStudents: "",
      location: "",
      link: ""
    });
  };

  const classesOnSelectedDate = classes.filter(
    (cls) => selectedDate && cls.date.toDateString() === selectedDate.toDateString()
  );

  const getDatesWithClasses = () => {
    return classes.map(cls => cls.date);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2">Tutor Class Management</h1>
          <p className="text-gray-600">Manage your classes and schedule</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newClass.date}
                  onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newClass.startTime}
                    onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newClass.endTime}
                    onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  placeholder="e.g., Mathematics, Physics"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxStudents">Number of Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={newClass.maxStudents}
                  onChange={(e) => setNewClass({ ...newClass, maxStudents: e.target.value })}
                  placeholder="Maximum capacity"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newClass.location}
                  onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                  placeholder="e.g., Room 301, Online"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="link">Meeting Link</Label>
                <Input
                  id="link"
                  type="url"
                  value={newClass.link}
                  onChange={(e) => setNewClass({ ...newClass, link: e.target.value })}
                  placeholder="https://meet.example.com/class"
                />
              </div>

              <Button onClick={handleCreateClass} className="mt-4">
                Create Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasClass: getDatesWithClasses()
                }}
                modifiersStyles={{
                  hasClass: {
                    fontWeight: "bold",
                    textDecoration: "underline"
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? `Classes on ${selectedDate.toLocaleDateString()}`
                  : "Select a date to view classes"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {classesOnSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {classesOnSelectedDate.map((cls) => (
                    <div
                      key={cls.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="mb-1">{cls.subject}</h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Clock className="w-4 h-4" />
                            {cls.startTime} - {cls.endTime}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {cls.currentStudents}/{cls.maxStudents} students
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {cls.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <LinkIcon className="w-4 h-4" />
                          <a href={cls.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Meeting Link
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No classes scheduled for this date
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>All Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classes
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((cls) => (
                    <div
                      key={cls.id}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            {cls.date.toLocaleDateString("en-US", { month: "short" })}
                          </div>
                          <div>{cls.date.getDate()}</div>
                        </div>
                        <div>
                          <div>{cls.subject}</div>
                          <div className="text-sm text-gray-600">
                            {cls.startTime} - {cls.endTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {cls.currentStudents}/{cls.maxStudents} students
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
