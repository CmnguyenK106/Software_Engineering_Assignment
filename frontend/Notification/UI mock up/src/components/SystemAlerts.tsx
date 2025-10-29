import { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function SystemAlerts() {
  const [showComposer, setShowComposer] = useState(false);
  const [severity, setSeverity] = useState<'info' | 'warning' | 'critical'>('info');

  const existingAlerts = [
    {
      id: 1,
      title: 'Bảo trì hệ thống',
      severity: 'warning',
      status: 'active',
      date: '24/10/2025',
    },
    {
      id: 2,
      title: 'Cập nhật phiên bản mới',
      severity: 'info',
      status: 'active',
      date: '20/10/2025',
    },
    {
      id: 3,
      title: 'Lỗi kết nối SSO',
      severity: 'critical',
      status: 'resolved',
      date: '18/10/2025',
    },
  ];

  const severityConfig = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      icon: Info,
      badge: 'bg-blue-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      icon: AlertTriangle,
      badge: 'bg-yellow-500',
    },
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      icon: AlertCircle,
      badge: 'bg-red-500',
    },
  };

  const currentSeverity = severityConfig[severity];
  const SeverityIcon = currentSeverity.icon;

  if (showComposer) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gửi cảnh báo hệ thống / Báo lỗi</CardTitle>
            <CardDescription>Tạo thông báo hệ thống mới</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="alert-title">Tiêu đề *</Label>
              <Input
                id="alert-title"
                placeholder="VD: Bảo trì hệ thống"
                className="mt-1"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="alert-content">Nội dung *</Label>
              <Textarea
                id="alert-content"
                placeholder="Mô tả ngắn gọn về cảnh báo..."
                className="mt-1"
                rows={4}
              />
            </div>

            {/* Severity */}
            <div>
              <Label className="mb-3 block">Mức độ *</Label>
              <RadioGroup value={severity} onValueChange={(v: any) => setSeverity(v)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="info" id="sev-info" />
                    <Label htmlFor="sev-info" className="flex items-center gap-2 cursor-pointer">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span>Thông tin</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="warning" id="sev-warning" />
                    <Label htmlFor="sev-warning" className="flex items-center gap-2 cursor-pointer">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span>Cảnh báo</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="critical" id="sev-critical" />
                    <Label htmlFor="sev-critical" className="flex items-center gap-2 cursor-pointer">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>Nghiêm trọng</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Preview */}
            <div>
              <Label className="mb-2 block">Xem trước</Label>
              <Alert className={`${currentSeverity.bg} ${currentSeverity.border}`}>
                <SeverityIcon className={`w-5 h-5 ${currentSeverity.text}`} />
                <AlertDescription className={currentSeverity.text}>
                  <strong>Bảo trì hệ thống</strong>
                  <br />
                  Hệ thống sẽ bảo trì vào 26/10/2025 từ 22:00 - 23:00
                </AlertDescription>
              </Alert>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setShowComposer(false)}>
                Hủy
              </Button>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3]">
                Xuất bản cảnh báo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0066CC] rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-900">Quản lý Cảnh báo Hệ thống</h1>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
          <Button
            onClick={() => setShowComposer(true)}
            className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]"
          >
            <Plus className="w-4 h-4" />
            Tạo cảnh báo mới
          </Button>
        </div>
      </div>

      {/* Active Alerts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cảnh báo đang hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {existingAlerts
              .filter((a) => a.status === 'active')
              .map((alert) => {
                const config = severityConfig[alert.severity as keyof typeof severityConfig];
                const Icon = config.icon;
                return (
                  <Alert key={alert.id} className={`${config.bg} ${config.border}`}>
                    <Icon className={`w-5 h-5 ${config.text}`} />
                    <AlertDescription className={config.text}>
                      <div className="flex items-center justify-between">
                        <div>
                          <strong>{alert.title}</strong>
                          <p className="text-sm mt-1">{alert.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Tắt
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử cảnh báo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingAlerts.map((alert) => {
                const config = severityConfig[alert.severity as keyof typeof severityConfig];
                return (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.title}</TableCell>
                    <TableCell>
                      <Badge className={config.badge}>
                        {alert.severity === 'info'
                          ? 'Thông tin'
                          : alert.severity === 'warning'
                          ? 'Cảnh báo'
                          : 'Nghiêm trọng'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={alert.status === 'active' ? 'default' : 'outline'}>
                        {alert.status === 'active' ? 'Đang hoạt động' : 'Đã giải quyết'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{alert.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
