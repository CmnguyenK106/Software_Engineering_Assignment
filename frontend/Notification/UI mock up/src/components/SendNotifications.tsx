import { useState } from 'react';
import { Send, Users, FileText, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

export function SendNotifications() {
  const [step, setStep] = useState(1);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const recipientGroups = [
    { id: 'all-tutors', name: 'Tất cả Tutor', count: 120 },
    { id: 'all-mentees', name: 'Tất cả Mentee', count: 450 },
    { id: 'active-tutors', name: 'Tutor đang hoạt động', count: 85 },
    { id: 'new-mentees', name: 'Mentee mới đăng ký', count: 32 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#0066CC] rounded-lg flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-gray-900">Gửi Thông báo tập thể</h1>
            <p className="text-sm text-gray-600">
              Phòng CTSV / Phòng Đào tạo / Khoa Bộ môn
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[
          { num: 1, title: 'Chọn đối tượng', icon: Users },
          { num: 2, title: 'Soạn nội dung', icon: FileText },
          { num: 3, title: 'Xác nhận gửi', icon: CheckCircle },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  step >= s.num ? 'text-[#0066CC]' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.num ? 'bg-[#0066CC] text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm hidden md:block">{s.title}</span>
              </div>
              {idx < 2 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > s.num ? 'bg-[#0066CC]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select Recipients */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Chọn đối tượng nhận thông báo</CardTitle>
            <CardDescription>Chọn nhóm người nhận hoặc tùy chỉnh</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {recipientGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRecipients.includes(group.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRecipients([...selectedRecipients, group.id]);
                        } else {
                          setSelectedRecipients(
                            selectedRecipients.filter((id) => id !== group.id)
                          );
                        }
                      }}
                    />
                    <div>
                      <p className="text-sm text-gray-900">{group.name}</p>
                      <p className="text-xs text-gray-600">{group.count} người</p>
                    </div>
                  </div>
                  <Badge variant="outline">{group.count}</Badge>
                </div>
              ))}
            </div>

            {selectedRecipients.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>{selectedRecipients.length}</strong> nhóm được chọn
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline">Hủy</Button>
              <Button
                onClick={() => setStep(2)}
                className="bg-[#0066CC] hover:bg-[#0052A3]"
                disabled={selectedRecipients.length === 0}
              >
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Compose */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Soạn nội dung thông báo</CardTitle>
            <CardDescription>Nhập thông tin thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Loại thông báo</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Chọn loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="registration">Xác nhận đăng ký</SelectItem>
                  <SelectItem value="matching">Kết quả ghép cặp</SelectItem>
                  <SelectItem value="report">Yêu cầu nộp báo cáo</SelectItem>
                  <SelectItem value="evaluation">Đánh giá học tập</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề thông báo..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Nội dung *</Label>
              <Textarea
                id="content"
                placeholder="Nhập nội dung thông báo..."
                className="mt-1 min-h-32"
              />
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep(1)}>
                Quay lại
              </Button>
              <Button onClick={() => setStep(3)} className="bg-[#0066CC] hover:bg-[#0052A3]">
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Xác nhận gửi thông báo</CardTitle>
            <CardDescription>Kiểm tra thông tin trước khi gửi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Đối tượng nhận:</p>
                <p className="text-gray-900">{selectedRecipients.length} nhóm đã chọn</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiêu đề:</p>
                <p className="text-gray-900">Thông báo đăng ký chương trình Tutor</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nội dung:</p>
                <p className="text-gray-900">
                  Thông báo về chương trình Tutor hỗ trợ học tập...
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                ✓ Thông báo sẽ được gửi qua In-app và Email
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep(2)}>
                Quay lại
              </Button>
              <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
                <Send className="w-4 h-4" />
                Gửi thông báo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
