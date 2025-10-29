import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Star,
  TrendingUp,
  MessageSquare,
  Award,
  Calendar,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ratingData = [
  { month: "T6", rating: 4.3 },
  { month: "T7", rating: 4.5 },
  { month: "T8", rating: 4.7 },
  { month: "T9", rating: 4.6 },
  { month: "T10", rating: 4.8 },
];

const categoryData = [
  { category: "Chất lượng", score: 4.8 },
  { category: "Kiến thức", score: 4.9 },
  { category: "Rõ ràng", score: 4.7 },
  { category: "Hỗ trợ", score: 4.6 },
  { category: "Thời gian", score: 4.5 },
];

const recentFeedback = [
  {
    id: 1,
    date: "15/10/2025",
    rating: 5,
    comment: "Buổi học rất tuyệt vời, giảng viên nhiệt tình và dễ hiểu.",
    type: "positive",
  },
  {
    id: 2,
    date: "14/10/2025",
    rating: 4,
    comment: "Nội dung hay nhưng cần thêm thời gian thực hành.",
    type: "improvement",
  },
  {
    id: 3,
    date: "12/10/2025",
    rating: 5,
    comment: "Rất hài lòng với phong cách giảng dạy của thầy.",
    type: "positive",
  },
  {
    id: 4,
    date: "10/10/2025",
    rating: 5,
    comment: "Giải thích chi tiết, dễ hiểu. Tài liệu cũng rất đầy đủ.",
    type: "positive",
  },
];

export function TutorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#003DA5] mb-1">Bảng điều khiển của Tutor</h2>
        <p className="text-gray-600">Tutor's Feedback Dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md border-t-4 border-t-[#00A6ED]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đánh giá trung bình</p>
                <p className="text-3xl text-[#003DA5] mt-1">4.8</p>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4.8 ? "fill-[#00A6ED] text-[#00A6ED]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-[#00A6ED] bg-opacity-10 p-3 rounded-lg">
                <Star className="w-8 h-8 text-[#00A6ED]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#00A6ED]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng đánh giá</p>
                <p className="text-3xl text-[#003DA5] mt-1">127</p>
                <p className="text-sm text-green-600 mt-2">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +12% tháng này
                </p>
              </div>
              <div className="bg-[#00A6ED] bg-opacity-10 p-3 rounded-lg">
                <MessageSquare className="w-8 h-8 text-[#00A6ED]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#00A6ED]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ khuyến nghị</p>
                <p className="text-3xl text-[#003DA5] mt-1">96%</p>
                <p className="text-sm text-gray-600 mt-2">122/127 sinh viên</p>
              </div>
              <div className="bg-[#00A6ED] bg-opacity-10 p-3 rounded-lg">
                <Award className="w-8 h-8 text-[#00A6ED]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#00A6ED]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Buổi học tháng này</p>
                <p className="text-3xl text-[#003DA5] mt-1">32</p>
                <p className="text-sm text-gray-600 mt-2">8 buổi/tuần</p>
              </div>
              <div className="bg-[#00A6ED] bg-opacity-10 p-3 rounded-lg">
                <Calendar className="w-8 h-8 text-[#00A6ED]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-[#003DA5]">Xu hướng đánh giá theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#00A6ED"
                  strokeWidth={2}
                  name="Điểm trung bình"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-[#003DA5]">Đánh giá theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#003DA5" name="Điểm số" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Metrics */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003DA5]">Chỉ số tiến độ - Progress Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Tỷ lệ hoàn thành mục tiêu học tập</span>
              <span className="text-sm text-[#003DA5]">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Mức độ hài lòng của học viên</span>
              <span className="text-sm text-[#003DA5]">96%</span>
            </div>
            <Progress value={96} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Tương tác và giao tiếp</span>
              <span className="text-sm text-[#003DA5]">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Quản lý thời gian hiệu quả</span>
              <span className="text-sm text-[#003DA5]">90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003DA5]">Phản hồi gần đây - Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="border-l-4 border-l-[#00A6ED] bg-gray-50 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating
                                ? "fill-[#00A6ED] text-[#00A6ED]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{feedback.date}</span>
                      {feedback.type === "positive" ? (
                        <Badge className="bg-green-100 text-green-700">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Tích cực
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          Cải thiện
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700">{feedback.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
