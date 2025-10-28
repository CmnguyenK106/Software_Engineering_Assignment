import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, GraduationCap, Clock, TrendingUp, Star, UserCheck, BookOpen, Calendar } from "lucide-react";

// Mock data for tutor breakdown
const tutorBreakdownData = [
  { name: "Faculty", value: 45, color: "#186AC7" },
  { name: "PhD Candidates", value: 32, color: "#4A9DE8" },
  { name: "Senior Students", value: 23, color: "#7DBCF0" },
];

// Mock data for top faculties by student participation
const topFacultiesData = [
  { faculty: "Engineering", students: 156 },
  { faculty: "Sciences", students: 143 },
  { faculty: "Business", students: 128 },
  { faculty: "Arts & Humanities", students: 112 },
  { faculty: "Medicine", students: 98 },
];

// Mock data for top subjects
const topSubjectsData = [
  { subject: "Calculus", requests: 245 },
  { subject: "Physics", requests: 198 },
  { subject: "Chemistry", requests: 176 },
  { subject: "Programming", requests: 164 },
  { subject: "Statistics", requests: 142 },
];

// Mock data for cancellation breakdown
const cancellationData = [
  { name: "By Tutors", value: 35, color: "#ef4444" },
  { name: "By Students", value: 65, color: "#f97316" },
];

export function TaskAnalysis() {
  return (
    <div className="space-y-8">
      {/* Section 1: Tutor Metrics */}
      <div>
        <h2 className="mb-4 text-[#186AC7]">Tutor (Instructor) Metrics</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Total Active Tutors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">152 <span className="text-sm text-muted-foreground">persons</span></div>
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                <div>Faculty: 68 persons</div>
                <div>PhD Candidates: 49 persons</div>
                <div>Senior Students: 35 persons</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Tutor Active Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">87.3%</div>
              <Progress value={87.3} className="mt-2 [&>div]:bg-[#186AC7]" />
              <p className="text-xs text-muted-foreground mt-2">
                Minimum 5 sessions per semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Avg. Support Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">24.5 <span className="text-sm text-muted-foreground">hrs/tutor</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  8.2%
                </span>
                {" "}from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Session Logging Rate</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">94.8%</div>
              <Progress value={94.8} className="mt-2 [&>div]:bg-[#186AC7]" />
              <p className="text-xs text-muted-foreground mt-2">
                Sessions logged on system
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tutor Type Distribution</CardTitle>
            <CardDescription>Breakdown by tutor category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tutorBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tutorBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 2: Student Metrics */}
      <div>
        <h2 className="mb-4 text-[#186AC7]">Student (Mentee) Metrics</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Total Participating Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">1,847 <span className="text-sm text-muted-foreground">students</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  15.3%
                </span>
                {" "}from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Coverage Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">68.4%</div>
              <Progress value={68.4} className="mt-2 [&>div]:bg-[#186AC7]" />
              <p className="text-xs text-muted-foreground mt-2">
                Of total eligible students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Active Student Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">76.2%</div>
              <Progress value={76.2} className="mt-2 [&>div]:bg-[#186AC7]" />
              <p className="text-xs text-muted-foreground mt-2">
                Attending 3+ sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>At-Risk Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">284 <span className="text-sm text-muted-foreground">students</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                62.7% of all students on academic probation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 3: Session Statistics */}
      <div>
        <h2 className="mb-4 text-[#186AC7]">Session Statistics</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Completed Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">3,726 <span className="text-sm text-muted-foreground">sessions</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  18.4%
                </span>
                {" "}from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Total Tutoring Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">7,452 <span className="text-sm text-muted-foreground">hours</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                Average 2 hours per session
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Cancellation Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">8.6%</div>
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                <div>3.0% by Tutors</div>
                <div>5.6% by Students</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Avg. Session Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">4.6 <span className="text-sm text-muted-foreground">/ 5.0</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on 3,426 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Faculties by Student Participation</CardTitle>
              <CardDescription>Most active faculties this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topFacultiesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="faculty" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#186AC7" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Most Requested Subjects/Topics</CardTitle>
              <CardDescription>Most popular tutoring subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSubjectsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="subject" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#186AC7" name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cancellation Breakdown</CardTitle>
            <CardDescription>Cancellations by party responsible</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cancellationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cancellationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 4: Feedback (Tutor and Student) */}
      <div>
        <h2 className="mb-4 text-[#186AC7]">Feedback</h2>
        
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>Feedback from mentees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Average Satisfaction Score (CSAT)</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#186AC7] text-[#186AC7]" />
                    <strong>4.6 / 5.0</strong>
                  </span>
                </div>
                <Progress value={92} className="[&>div]:bg-[#186AC7]" />

                <div className="flex items-center justify-between pt-2">
                  <span>Student Retention Rate</span>
                  <strong>81.5%</strong>
                </div>
                <Progress value={81.5} className="[&>div]:bg-[#186AC7]" />
                <p className="text-xs text-muted-foreground">
                  Students who booked a follow-up session
                </p>

                <div className="pt-4 border-t">
                  <p className="text-sm mb-2">Common Complaints/Feedback:</p>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Some tutors cancel sessions last minute (12%)</li>
                    <li>Difficulty booking popular tutors (18%)</li>
                    <li>Would like more time slots available (15%)</li>
                    <li>Request for more specialized subjects (9%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tutor Feedback</CardTitle>
              <CardDescription>Feedback from instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Booking Feature Satisfaction</span>
                  <strong>4.3 / 5.0</strong>
                </div>
                <Progress value={86} className="[&>div]:bg-[#186AC7]" />

                <div className="flex items-center justify-between pt-2">
                  <span>Logging/Reporting Feature Satisfaction</span>
                  <strong>4.5 / 5.0</strong>
                </div>
                <Progress value={90} className="[&>div]:bg-[#186AC7]" />

                <div className="flex items-center justify-between pt-2">
                  <span>Students Prepared in Advance</span>
                  <strong>72.8%</strong>
                </div>
                <Progress value={72.8} className="[&>div]:bg-[#186AC7]" />
                <p className="text-xs text-muted-foreground">
                  Students who came prepared to sessions
                </p>

                <div className="pt-4 border-t">
                  <p className="text-sm mb-2">Common Suggestions:</p>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Better notification system (22%)</li>
                    <li>Automated session reminders (31%)</li>
                    <li>More flexible scheduling options (19%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 5: Scores */}
      <div>
        <h2 className="mb-4 text-[#186AC7]">Academic Performance Scores</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Avg. GPA of Participants</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">3.24 <span className="text-sm text-muted-foreground">/ 4.0</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  0.18
                </span>
                {" "}improvement from start of semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Avg. GPA (At-Risk Students)</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">2.48 <span className="text-sm text-muted-foreground">/ 4.0</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600 inline-flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  0.31
                </span>
                {" "}improvement from start of semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Pass Rate Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">23.4%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Students who improved to passing grade after tutoring
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
