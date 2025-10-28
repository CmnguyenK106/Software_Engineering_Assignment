import { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Star, Users, MapPin, Clock, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ClassCard {
  id: string;
  subject: string;
  tutor: string;
  date: string;
  time: string;
  location: string;
  maxStudents: number;
  currentStudents: number;
  rating: number;
  image: string;
  isRecommended?: boolean;
}

interface TuteeClassSearchProps {
  onSelectClass: (classId: string) => void;
}

export function TuteeClassSearch({ onSelectClass }: TuteeClassSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const allClasses: ClassCard[] = [
    {
      id: "1",
      subject: "Advanced Mathematics",
      tutor: "Dr. Sarah Johnson",
      date: "Oct 12, 2025",
      time: "10:00 - 11:30",
      location: "Room 301",
      maxStudents: 15,
      currentStudents: 8,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      isRecommended: true
    },
    {
      id: "2",
      subject: "Physics Fundamentals",
      tutor: "Prof. Michael Chen",
      date: "Oct 15, 2025",
      time: "14:00 - 15:30",
      location: "Lab A",
      maxStudents: 12,
      currentStudents: 12,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      subject: "Organic Chemistry",
      tutor: "Dr. Emily Rodriguez",
      date: "Oct 18, 2025",
      time: "09:00 - 10:30",
      location: "Online",
      maxStudents: 10,
      currentStudents: 5,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      isRecommended: true
    },
    {
      id: "4",
      subject: "English Literature",
      tutor: "Prof. James Wilson",
      date: "Oct 20, 2025",
      time: "15:00 - 16:30",
      location: "Room 205",
      maxStudents: 20,
      currentStudents: 14,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    },
    {
      id: "5",
      subject: "Computer Science",
      tutor: "Dr. Alex Turner",
      date: "Oct 22, 2025",
      time: "11:00 - 12:30",
      location: "Computer Lab",
      maxStudents: 18,
      currentStudents: 9,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      isRecommended: true
    },
    {
      id: "6",
      subject: "Biology Basics",
      tutor: "Dr. Lisa Park",
      date: "Oct 25, 2025",
      time: "13:00 - 14:30",
      location: "Science Wing",
      maxStudents: 16,
      currentStudents: 11,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop"
    }
  ];

  const filteredClasses = allClasses.filter((cls) => {
    const matchesSearch = cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = subjectFilter === "all" || 
                           cls.subject.toLowerCase().includes(subjectFilter.toLowerCase());
    
    const isFull = cls.currentStudents >= cls.maxStudents;
    const matchesAvailability = availabilityFilter === "all" ||
                               (availabilityFilter === "available" && !isFull) ||
                               (availabilityFilter === "full" && isFull);
    
    return matchesSearch && matchesSubject && matchesAvailability;
  });

  const recommendedClasses = filteredClasses.filter(cls => cls.isRecommended);
  const regularClasses = filteredClasses.filter(cls => !cls.isRecommended);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Discover Classes</h1>
        <p className="text-gray-600">Find the perfect class for your learning journey</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by subject or tutor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="computer">Computer Science</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
            </SelectContent>
          </Select>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {recommendedClasses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2>Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedClasses.map((cls) => (
              <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={cls.image}
                    alt={cls.subject}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600">
                    Recommended
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="line-clamp-1">{cls.subject}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{cls.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{cls.tutor}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {cls.date} • {cls.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {cls.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {cls.currentStudents}/{cls.maxStudents} students
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full"
                    disabled={cls.currentStudents >= cls.maxStudents}
                    onClick={() => onSelectClass(cls.id)}
                  >
                    {cls.currentStudents >= cls.maxStudents ? "Class Full" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4">All Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularClasses.map((cls) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={cls.image}
                  alt={cls.subject}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {cls.currentStudents >= cls.maxStudents && (
                  <Badge className="absolute top-3 right-3 bg-red-600">
                    Full
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="line-clamp-1">{cls.subject}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{cls.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{cls.tutor}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {cls.date} • {cls.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {cls.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {cls.currentStudents}/{cls.maxStudents} students
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full"
                  disabled={cls.currentStudents >= cls.maxStudents}
                  onClick={() => onSelectClass(cls.id)}
                >
                  {cls.currentStudents >= cls.maxStudents ? "Class Full" : "View Details"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No classes found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
