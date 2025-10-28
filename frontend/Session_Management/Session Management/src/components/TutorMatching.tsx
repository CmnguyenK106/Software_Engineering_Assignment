import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Search,
  CheckCircle,
  Clock
} from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  yearsExperience: number;
  bio: string;
  hourlyRate: string;
  availability: string;
}

export function TutorMatching() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [requestedTutors, setRequestedTutors] = useState<Set<string>>(new Set());

  const tutors: Tutor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      expertise: ["Mathematics", "Statistics", "Calculus"],
      rating: 4.8,
      totalStudents: 150,
      yearsExperience: 8,
      bio: "Passionate about making mathematics accessible and enjoyable for all students.",
      hourlyRate: "$45/hr",
      availability: "Mon, Wed, Fri"
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      expertise: ["Physics", "Engineering", "Mathematics"],
      rating: 4.9,
      totalStudents: 200,
      yearsExperience: 12,
      bio: "Experienced educator specializing in physics and engineering fundamentals.",
      hourlyRate: "$50/hr",
      availability: "Tue, Thu, Sat"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      expertise: ["Chemistry", "Biology", "Science"],
      rating: 4.7,
      totalStudents: 120,
      yearsExperience: 6,
      bio: "Making science fun and engaging through hands-on learning experiences.",
      hourlyRate: "$40/hr",
      availability: "Mon, Tue, Thu"
    },
    {
      id: "4",
      name: "Prof. James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      expertise: ["English", "Literature", "Writing"],
      rating: 4.6,
      totalStudents: 180,
      yearsExperience: 10,
      bio: "Helping students discover the joy of literature and improve their writing skills.",
      hourlyRate: "$38/hr",
      availability: "Mon, Wed, Fri, Sat"
    },
    {
      id: "5",
      name: "Dr. Alex Turner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      expertise: ["Computer Science", "Programming", "Web Development"],
      rating: 4.9,
      totalStudents: 220,
      yearsExperience: 7,
      bio: "Industry professional teaching cutting-edge programming and web development.",
      hourlyRate: "$55/hr",
      availability: "Flexible"
    },
    {
      id: "6",
      name: "Dr. Lisa Park",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      expertise: ["Biology", "Anatomy", "Health Sciences"],
      rating: 4.5,
      totalStudents: 95,
      yearsExperience: 5,
      bio: "Dedicated to helping students understand the complexity and beauty of biology.",
      hourlyRate: "$42/hr",
      availability: "Tue, Wed, Fri"
    }
  ];

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = subjectFilter === "all" || 
                          tutor.expertise.some(exp => exp.toLowerCase().includes(subjectFilter.toLowerCase()));
    
    return matchesSearch && matchesSubject;
  });

  const handleSendRequest = (tutorId: string) => {
    setRequestedTutors(new Set([...requestedTutors, tutorId]));
  };

  const isRequested = (tutorId: string) => requestedTutors.has(tutorId);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Find Your Perfect Tutor</h1>
        <p className="text-gray-600">Connect with expert tutors and start your learning journey</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name or subject..."
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
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="computer">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback>
                    {tutor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 line-clamp-1">{tutor.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{tutor.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">
                      ({tutor.totalStudents})
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 line-clamp-2">{tutor.bio}</p>

              <div className="flex flex-wrap gap-1">
                {tutor.expertise.map((subject, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{tutor.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{tutor.yearsExperience} years exp.</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{tutor.availability}</span>
                </div>
                <span className="font-semibold text-blue-600">{tutor.hourlyRate}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              {!isRequested(tutor.id) ? (
                <Button 
                  className="w-full"
                  onClick={() => handleSendRequest(tutor.id)}
                >
                  Send Request
                </Button>
              ) : (
                <Button 
                  className="w-full gap-2" 
                  disabled
                  variant="secondary"
                >
                  <CheckCircle className="w-4 h-4" />
                  Request Sent
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No tutors found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
