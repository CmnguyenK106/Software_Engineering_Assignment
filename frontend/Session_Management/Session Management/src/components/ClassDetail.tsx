import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Users, 
  BookOpen, 
  MapPin, 
  Clock, 
  Calendar, 
  Star, 
  Link as LinkIcon,
  CheckCircle,
  XCircle 
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface ClassDetailProps {
  classId: string;
  onBack: () => void;
}

export function ClassDetail({ classId, onBack }: ClassDetailProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock data - would come from props or API
  const classData = {
    id: classId,
    subject: "Advanced Mathematics",
    description: "Master advanced mathematical concepts including calculus, linear algebra, and differential equations. This comprehensive course is designed for students who want to deepen their understanding of mathematics and its applications in real-world scenarios.",
    tutor: {
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      rating: 4.8,
      totalStudents: 150,
      expertise: "Mathematics, Statistics"
    },
    date: "Oct 12, 2025",
    time: "10:00 - 11:30",
    location: "Room 301",
    maxStudents: 15,
    currentStudents: 8,
    link: "https://meet.example.com/math-101",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
    syllabus: [
      "Introduction to Advanced Calculus",
      "Linear Algebra Fundamentals",
      "Differential Equations",
      "Mathematical Modeling",
      "Problem Solving Techniques"
    ],
    prerequisites: "Basic Calculus and Algebra",
    duration: "8 weeks"
  };

  const isFull = classData.currentStudents >= classData.maxStudents;
  const spotsLeft = classData.maxStudents - classData.currentStudents;

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  const handleLeave = () => {
    setIsEnrolled(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-6">
        ← Back to Classes
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={classData.image}
                alt={classData.subject}
                className="w-full h-full object-cover"
              />
              {isFull && (
                <Badge className="absolute top-4 right-4 bg-red-600 text-white">
                  Class Full
                </Badge>
              )}
              {!isFull && spotsLeft <= 3 && (
                <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
                  Only {spotsLeft} spots left
                </Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="mb-2">{classData.subject}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {classData.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {classData.time}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2">About This Class</h3>
                <p className="text-gray-700 leading-relaxed">
                  {classData.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {classData.syllabus.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prerequisites</p>
                  <p>{classData.prerequisites}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p>{classData.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p>{classData.subject}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment</p>
                  <p>
                    {classData.currentStudents}/{classData.maxStudents} students
                  </p>
                  {isFull ? (
                    <Badge variant="destructive" className="mt-1">Full</Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                      Available
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p>{classData.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <LinkIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Meeting Link</p>
                  <a 
                    href={classData.link} 
                    className="text-blue-600 hover:underline text-sm break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Meeting
                  </a>
                </div>
              </div>

              <Separator />

              {!isEnrolled ? (
                <Button 
                  className="w-full" 
                  disabled={isFull}
                  onClick={handleEnroll}
                >
                  {isFull ? "Class Full" : "Enroll in Class"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>You're enrolled!</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLeave}
                  >
                    Leave Class
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={classData.tutor.avatar} alt={classData.tutor.name} />
                  <AvatarFallback>
                    {classData.tutor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1">{classData.tutor.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{classData.tutor.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">
                      ({classData.tutor.totalStudents} students)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{classData.tutor.expertise}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Tutor Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
