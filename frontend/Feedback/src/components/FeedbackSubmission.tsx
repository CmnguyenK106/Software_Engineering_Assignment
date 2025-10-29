import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { StarRating } from "./StarRating";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";

interface FeedbackSubmissionProps {
  onSubmit: (feedback: any) => void;
}

export function FeedbackSubmission({ onSubmit }: FeedbackSubmissionProps) {
  const [ratings, setRatings] = useState({
    overall: 0,
    knowledge: 0,
    clarity: 0,
    helpfulness: 0,
    timeManagement: 0,
  });

  const [comments, setComments] = useState({
    strengths: "",
    improvements: "",
    detailed: "",
    objectives: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    onSubmit({ ratings, comments, recommendation, anonymous, isDraft });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#003DA5] mb-1">Đánh giá buổi học</h2>
        <p className="text-gray-600">Session Feedback</p>
      </div>

      {/* Session Information Card */}
      <Card className="border-[#00A6ED] shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#003DA5] to-[#00A6ED] text-white rounded-t-lg">
          <CardTitle>Thông tin buổi học - Session Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#00A6ED]" />
              <div>
                <p className="text-sm text-gray-500">Tutor</p>
                <p>TS. Nguyễn Văn A</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#00A6ED]" />
              <div>
                <p className="text-sm text-gray-500">Ngày học</p>
                <p>10/10/2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#00A6ED]" />
              <div>
                <p className="text-sm text-gray-500">Thời gian</p>
                <p>14:00 - 15:50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#00A6ED]" />
              <div>
                <p className="text-sm text-gray-500">Môn học</p>
                <p>Giải tích 1 - Calculus I</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#00A6ED]" />
              <div>
                <p className="text-sm text-gray-500">Hình thức</p>
                <p>Trực tuyến (Online)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ratings Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003DA5]">Đánh giá chi tiết - Detailed Ratings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <StarRating
            label="Chất lượng tổng thể (Overall Quality)"
            value={ratings.overall}
            onChange={(value) => setRatings({ ...ratings, overall: value })}
          />
          <StarRating
            label="Kiến thức của Tutor (Tutor Knowledge)"
            value={ratings.knowledge}
            onChange={(value) => setRatings({ ...ratings, knowledge: value })}
          />
          <StarRating
            label="Độ rõ ràng trong giao tiếp (Communication Clarity)"
            value={ratings.clarity}
            onChange={(value) => setRatings({ ...ratings, clarity: value })}
          />
          <StarRating
            label="Sự hỗ trợ và nhiệt tình (Helpfulness)"
            value={ratings.helpfulness}
            onChange={(value) => setRatings({ ...ratings, helpfulness: value })}
          />
          <StarRating
            label="Quản lý thời gian (Time Management)"
            value={ratings.timeManagement}
            onChange={(value) => setRatings({ ...ratings, timeManagement: value })}
          />
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003DA5]">Nhận xét - Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="strengths">Điểm tốt của buổi học (Session strengths)</Label>
            <Textarea
              id="strengths"
              placeholder="Những điểm bạn thấy tốt trong buổi học..."
              value={comments.strengths}
              onChange={(e) => setComments({ ...comments, strengths: e.target.value })}
              className="mt-2 min-h-[100px]"
            />
          </div>
          <div>
            <Label htmlFor="improvements">Điểm cần cải thiện (Areas for improvement)</Label>
            <Textarea
              id="improvements"
              placeholder="Những điểm cần cải thiện trong buổi học sau..."
              value={comments.improvements}
              onChange={(e) => setComments({ ...comments, improvements: e.target.value })}
              className="mt-2 min-h-[100px]"
            />
          </div>
          <div>
            <Label htmlFor="detailed">Nhận xét chi tiết (Detailed comments)</Label>
            <Textarea
              id="detailed"
              placeholder="Nhận xét chi tiết về buổi học..."
              value={comments.detailed}
              onChange={(e) => setComments({ ...comments, detailed: e.target.value })}
              className="mt-2 min-h-[120px]"
            />
          </div>
          <div>
            <Label htmlFor="objectives">
              Mức độ đạt được mục tiêu học tập (Learning objectives achievement)
            </Label>
            <Textarea
              id="objectives"
              placeholder="Bạn đã đạt được mục tiêu học tập đề ra chưa?"
              value={comments.objectives}
              onChange={(e) => setComments({ ...comments, objectives: e.target.value })}
              className="mt-2 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003DA5]">
            Bạn có khuyến nghị tutor này không? (Would you recommend this tutor?)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={recommendation} onValueChange={setRecommendation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="definitely" id="definitely" />
              <Label htmlFor="definitely">Chắc chắn rồi (Definitely yes)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="probably" id="probably" />
              <Label htmlFor="probably">Có thể (Probably yes)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral">Trung lập (Neutral)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="probably-not" id="probably-not" />
              <Label htmlFor="probably-not">Có thể không (Probably not)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">Không (No)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Anonymous Toggle */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="anonymous">Gửi đánh giá ẩn danh (Submit anonymously)</Label>
              <p className="text-sm text-gray-500 mt-1">
                Tutor sẽ không biết ai là người gửi đánh giá này
              </p>
            </div>
            <Switch
              id="anonymous"
              checked={anonymous}
              onCheckedChange={setAnonymous}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={(e) => handleSubmit(e, true)}
          className="border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
        >
          Lưu nháp (Save draft)
        </Button>
        <Button
          onClick={(e) => handleSubmit(e, false)}
          className="bg-[#003DA5] hover:bg-[#00A6ED] text-white"
        >
          Gửi đánh giá (Submit)
        </Button>
      </div>
    </div>
  );
}
