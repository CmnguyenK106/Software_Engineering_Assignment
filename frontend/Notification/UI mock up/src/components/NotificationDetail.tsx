import { ArrowLeft, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface NotificationDetailProps {
  notification: any;
  onBack: () => void;
}

export function NotificationDetail({ notification, onBack }: NotificationDetailProps) {
  const Icon = notification.icon;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-6 h-6 ${notification.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-gray-900">{notification.title}</CardTitle>
                {notification.isNew && (
                  <Badge className="bg-[#0066CC] text-white">Mới</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">{notification.time}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 space-y-6">
          {/* Main Content */}
          <div>
            <h3 className="mb-3 text-gray-900">Chi tiết</h3>
            <p className="text-gray-700">{notification.description}</p>

            {/* Type-specific details */}
            {notification.type === 'matching' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900">Thông tin Tutor</span>
                </div>
                <div className="space-y-2 text-sm mt-3">
                  <p className="text-gray-900">
                    <strong>Họ tên:</strong> Nguyễn Văn A
                  </p>
                  <p className="text-gray-900">
                    <strong>MSSV:</strong> 2011234
                  </p>
                  <p className="text-gray-900">
                    <strong>Môn:</strong> Toán cao cấp 1
                  </p>
                  <p className="text-gray-900">
                    <strong>Email:</strong> nguyenvana@hcmut.edu.vn
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            {notification.type === 'report' && (
              <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
                <MessageSquare className="w-4 h-4" />
                Nộp báo cáo
              </Button>
            )}
            {notification.type === 'evaluation' && (
              <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
                <MessageSquare className="w-4 h-4" />
                Đánh giá ngay
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
