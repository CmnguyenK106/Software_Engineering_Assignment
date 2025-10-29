import { useState } from 'react';
import { Bell, Users, MessageSquare, AlertCircle, CheckCheck, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { NotificationDetail } from './NotificationDetail';

export function NotificationCenter() {
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  // All notifications for Mentee/Tutor
  const notifications = [
    {
      id: 1,
      type: 'registration',
      title: 'Xác nhận đăng ký chương trình',
      description: 'Bạn đã đăng ký thành công chương trình Tutor hỗ trợ môn Toán cao cấp 1',
      time: '10 phút trước',
      isNew: true,
      icon: CheckCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 2,
      type: 'matching',
      title: 'Kết quả ghép cặp Tutor',
      description: 'Bạn đã được ghép cặp với Tutor Nguyễn Văn A cho môn Toán cao cấp 1',
      time: '2 giờ trước',
      isNew: true,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      type: 'consultation',
      title: 'Thông báo tạo buổi tư vấn',
      description: 'Bạn có buổi tư vấn mới vào ngày 26/10/2025 lúc 15:00',
      time: '3 giờ trước',
      isNew: false,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 4,
      type: 'report',
      title: 'Yêu cầu nộp báo cáo sau buổi học',
      description: 'Vui lòng nộp báo cáo đánh giá buổi học ngày 23/10/2025',
      time: '5 giờ trước',
      isNew: false,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: 5,
      type: 'evaluation',
      title: 'Thông báo liên kết học tập đánh giá',
      description: 'Vui lòng đánh giá buổi học với Tutor để cải thiện chất lượng',
      time: 'Hôm qua',
      isNew: false,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 6,
      type: 'progress',
      title: 'Cập nhật tiến độ học tập',
      description: 'Bạn đã hoàn thành 75% chương trình học với Tutor',
      time: 'Hôm qua',
      isNew: false,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const unreadCount = notifications.filter((n) => n.isNew).length;

  const groupNotificationsByDate = (notifications: any[]) => {
    const today: any[] = [];
    const yesterday: any[] = [];

    notifications.forEach((notif) => {
      if (notif.time.includes('phút') || notif.time.includes('giờ')) {
        today.push(notif);
      } else {
        yesterday.push(notif);
      }
    });

    return { today, yesterday };
  };

  const grouped = groupNotificationsByDate(notifications);

  if (selectedNotification) {
    return (
      <NotificationDetail
        notification={selectedNotification}
        onBack={() => setSelectedNotification(null)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0066CC] rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-900">Trung tâm Thông báo</h1>
              <p className="text-sm text-gray-600">Mentee / Tutor</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">
            Tất cả ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Chưa đọc ({unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Hôm nay */}
          {grouped.today.length > 0 && (
            <div>
              <h3 className="text-sm text-gray-600 mb-3">Hôm nay</h3>
              <div className="space-y-2">
                {grouped.today.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => setSelectedNotification(notification)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Hôm qua */}
          {grouped.yesterday.length > 0 && (
            <div>
              <h3 className="text-sm text-gray-600 mb-3">Hôm qua</h3>
              <div className="space-y-2">
                {grouped.yesterday.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => setSelectedNotification(notification)}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-2 mt-6">
          {notifications
            .filter((n) => n.isNew)
            .map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => setSelectedNotification(notification)}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationCard({ notification, onClick }: any) {
  const Icon = notification.icon;

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md hover:bg-gray-50 ${
        notification.isNew ? 'border-l-4 border-l-[#0066CC]' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-5 h-5 ${notification.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="text-gray-900">
                {notification.title}
                {notification.isNew && (
                  <Badge className="ml-2 bg-[#0066CC] text-white text-xs">
                    Mới
                  </Badge>
                )}
              </h4>
              <span className="text-xs whitespace-nowrap text-gray-500">
                {notification.time}
              </span>
            </div>
            <p className="text-sm text-gray-600">{notification.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
