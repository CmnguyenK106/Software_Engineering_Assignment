import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Star, Calendar, User, BookOpen, Eye, EyeOff } from "lucide-react";

const mockFeedbackHistory = [
  {
    id: 1,
    date: "15/10/2025",
    tutor: "TS. Nguyễn Văn A",
    subject: "Giải tích 1",
    rating: 4.8,
    viewed: true,
  },
  {
    id: 2,
    date: "10/10/2025",
    tutor: "ThS. Trần Thị B",
    subject: "Đại số tuyến tính",
    rating: 4.5,
    viewed: true,
  },
  {
    id: 3,
    date: "05/10/2025",
    tutor: "TS. Lê Văn C",
    subject: "Vật lý đại cương",
    rating: 4.2,
    viewed: false,
  },
  {
    id: 4,
    date: "01/10/2025",
    tutor: "TS. Nguyễn Văn A",
    subject: "Giải tích 1",
    rating: 4.9,
    viewed: true,
  },
  {
    id: 5,
    date: "28/09/2025",
    tutor: "ThS. Phạm Văn D",
    subject: "Lập trình C++",
    rating: 4.7,
    viewed: false,
  },
];

export function FeedbackHistory() {
  const [filterDate, setFilterDate] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#003DA5] mb-1">Lịch sử đánh giá</h2>
        <p className="text-gray-600">Feedback History</p>
      </div>

      {/* Filters */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-gray-600 mb-2 block">Lọc theo ngày</label>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-gray-600 mb-2 block">Lọc theo điểm</label>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="5">5 sao</SelectItem>
                  <SelectItem value="4">4 sao trở lên</SelectItem>
                  <SelectItem value="3">3 sao trở lên</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {mockFeedbackHistory.map((feedback) => (
          <Card
            key={feedback.id}
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#00A6ED]"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00A6ED]" />
                      <span className="text-sm text-gray-600">{feedback.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00A6ED]" />
                      <span className="text-sm">{feedback.tutor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#00A6ED]" />
                      <span className="text-sm">{feedback.subject}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#00A6ED] text-[#00A6ED]" />
                      <span className="text-lg">{feedback.rating.toFixed(1)}</span>
                    </div>
                    {feedback.viewed ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Đã xem bởi tutor
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-600 border-gray-200"
                      >
                        <EyeOff className="w-3 h-3 mr-1" />
                        Chưa xem
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
                >
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
