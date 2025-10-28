import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Camera, X, Plus, Search, UserPlus, Eye, EyeOff, Monitor, CheckCircle, XCircle } from "lucide-react";

export function UserManagement() {
  const [skills, setSkills] = useState([
    "Cơ sở dữ liệu",
    "Software Engineering",
    "OOP",
    "Thiết kế web"
  ]);

  const [emailNotif, setEmailNotif] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [inAppNotif, setInAppNotif] = useState(true);
  const [autoMatch, setAutoMatch] = useState(false);

  // Security states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock logged-in devices
  const [devices] = useState([
    { id: 1, name: "Chrome on Windows", location: "Ho Chi Minh City, Vietnam", lastActive: "2 phút trước" },
    { id: 2, name: "Safari on iPhone", location: "Ho Chi Minh City, Vietnam", lastActive: "1 giờ trước" },
    { id: 3, name: "Firefox on MacOS", location: "Hanoi, Vietnam", lastActive: "2 ngày trước" },
  ]);

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addSkill = () => {
    const newSkill = prompt("Nhập kỹ năng mới:");
    if (newSkill && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Quản lý Người dùng</h1>
          <p className="text-sm text-gray-600">
            Trang này - Quản lý Người dùng | Hồ sơ cá nhân
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Hồ sơ cá nhân</TabsTrigger>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
            <TabsTrigger value="roles">Vai trò & Quyền hạn</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Thông tin cá nhân */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Thông tin cá nhân</h2>
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="w-3 h-3 mr-1" />
                  Đổi thông tin cá nhân/CACHE
                </Button>
              </div>

              <div className="flex gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-[#0B5FA5] rounded-full flex items-center justify-center text-white text-3xl">
                    MP
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="w-3 h-3 mr-1" />
                    Đổi ảnh đại diện
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Xóa ảnh
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <Label>Họ và tên *</Label>
                    <Input defaultValue="Mai Xuân Phúc" className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Dữ liệu từ DATACORE_HCMUT
                    </p>
                  </div>

                  <div>
                    <Label>Mã số sinh viên</Label>
                    <Input defaultValue="2312487" className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Dữ liệu từ DATACORE_HCMUT
                    </p>
                  </div>

                  <div>
                    <Label>Email học vụ *</Label>
                    <Input 
                      defaultValue="phuc.mai2312487@hcmut.edu.vn" 
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email chính (học vụ) dùng tài khoản
                    </p>
                  </div>

                  <div>
                    <Label>Email cá nhân</Label>
                    <Input 
                      defaultValue="maixuanphuc@gmail.com" 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Số điện thoại</Label>
                    <Input defaultValue="0901234567" className="mt-1" />
                  </div>

                  <div>
                    <Label>Khoa/Ngành</Label>
                    <Input 
                      defaultValue="Khoa Khoa học và kỹ thuật Máy tính" 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Vai trò hiện tại</Label>
                    <div className="mt-1">
                      <Button variant="outline" className="bg-[#0B5FA5] text-white hover:bg-[#094a85] hover:text-white">
                        Member
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Ngôn ngữ</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-6">
                <Label>Kỹ năng / Lĩnh vực quan tâm</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addSkill}
                    className="h-7"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Thêm kỹ năng
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Nhập chuỗi lĩnh vực kỹ năng chính phổi
                </p>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <Label>Giới thiệu bản thân</Label>
                <Textarea 
                  defaultValue="Sinh viên năm 3, Chuyên ngành Khoa học Máy tính. Đang tích cực học và hạng xuất sắc để nâng cao năng lực cũng hỏ năng lập trình"
                  className="mt-1 min-h-24"
                />
              </div>
            </div>

            {/* Tùy chọn tài khoản */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg mb-4">Tùy chọn tài khoản</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nhận thông báo Email</Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Bật thông báo qua email
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotif}
                        onCheckedChange={setEmailNotif}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nhận tin từ số cổng khác</Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Cho phép Tutor xem hồ sơ
                        </p>
                      </div>
                      <Switch 
                        checked={profileVisible}
                        onCheckedChange={setProfileVisible}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nhận thông báo in-app</Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Bật thông báo trong ứng dụng
                        </p>
                      </div>
                      <Switch 
                        checked={inAppNotif}
                        onCheckedChange={setInAppNotif}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Tự động gán cặp</Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Cho phép hệ thống gợi ý Tutor
                        </p>
                      </div>
                      <Switch 
                        checked={autoMatch}
                        onCheckedChange={setAutoMatch}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-[#0B5FA5] hover:bg-[#094a85]">
                  <Plus className="w-4 h-4 mr-1" />
                  Lưu cài đặt
                </Button>
              </div>
            </div>

            {/* Quản trị vai trò (Admin) */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Quản trị vai trò (Admin)</h2>
                <Button variant="outline" size="sm" className="text-xs text-[#0B5FA5]">
                  <Plus className="w-3 h-3 mr-1" />
                  Chỉ dành cho quản trị viên
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Tìm kiếm người dùng</Label>
                  <div className="relative mt-1">
                    <Input 
                      placeholder="Nhập MSSV, email hoặc tên..."
                      className="pr-8"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label>Lọc theo vai trò</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả vai trò</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-[#0B5FA5] hover:bg-[#094a85]">
                  <Plus className="w-4 h-4 mr-1" />
                  Tạo tài
                </Button>
                <Button variant="outline">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Thêm người dùng mới
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline">
                Làm mới dữ liệu/CACHE
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Hủy thay đổi</Button>
                <Button className="bg-[#0B5FA5] hover:bg-[#094a85]">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Đổi Mật khẩu */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg mb-4">Đổi Mật khẩu</h2>
              
              <div className="space-y-4 max-w-xl">
                <div>
                  <Label>Mật khẩu cũ *</Label>
                  <div className="relative mt-1">
                    <Input 
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu cũ"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Mật khẩu mới *</Label>
                  <div className="relative mt-1">
                    <Input 
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
                  </p>
                </div>

                <div>
                  <Label>Nhập lại Mật khẩu mới *</Label>
                  <div className="relative mt-1">
                    <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button className="bg-[#0B5FA5] hover:bg-[#094a85]">
                  Đổi Mật khẩu
                </Button>
              </div>
            </div>

            {/* Thiết bị Đã đăng nhập */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Thiết bị Đã đăng nhập</h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Đăng xuất tất cả thiết bị khác
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Đăng xuất khỏi tất cả thiết bị?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn sẽ bị đăng xuất khỏi tất cả các thiết bị khác ngoại trừ thiết bị hiện tại.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction className="bg-[#0B5FA5] hover:bg-[#094a85]">
                        Đăng xuất
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thiết bị</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Hoạt động cuối</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-gray-500" />
                        {device.name}
                      </TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>{device.lastActive}</TableCell>
                      <TableCell className="text-right">
                        {device.id === 1 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Thiết bị hiện tại
                          </Badge>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Đăng xuất
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            {/* Vai trò Hiện tại */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg mb-4">Vai trò Hiện tại</h2>
              
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Label>Vai trò:</Label>
                    <Badge className="bg-[#0B5FA5] text-white hover:bg-[#094a85] px-3 py-1">
                      Member
                    </Badge>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Mô tả:</strong> Vai trò Member cho phép bạn truy cập các tính năng cơ bản của hệ thống 
                      bao gồm đăng ký lịch tư vấn, gửi yêu cầu hỗ trợ, và tham gia các phiên tư vấn. 
                      Bạn có thể cập nhật thông tin cá nhân và quản lý tài khoản của mình.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chi tiết Quyền hạn */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg mb-4">Chi tiết Quyền hạn</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Đăng ký lịch tư vấn</p>
                    <p className="text-xs text-gray-600">Tạo và quản lý lịch hẹn tư vấn với tutor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Gửi yêu cầu hỗ trợ</p>
                    <p className="text-xs text-gray-600">Gửi câu hỏi và yêu cầu trợ giúp từ tutor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Đánh giá phiên tư vấn</p>
                    <p className="text-xs text-gray-600">Đánh giá và nhận xét sau mỗi phiên tư vấn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Truy cập Tài nguyên học tập</p>
                    <p className="text-xs text-gray-600">Xem và tải xuống tài liệu học tập</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm">Truy cập Báo cáo & Phân tích</p>
                    <p className="text-xs text-gray-600">Chỉ dành cho Admin và Tutor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm">Quản lý người dùng</p>
                    <p className="text-xs text-gray-600">Chỉ dành cho Admin</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm">Cài đặt hệ thống</p>
                    <p className="text-xs text-gray-600">Chỉ dành cho Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lịch sử Vai trò */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg mb-4">Lịch sử Vai trò</h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Thời gian bắt đầu</TableHead>
                    <TableHead>Thời gian kết thúc</TableHead>
                    <TableHead>Người thay đổi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge className="bg-[#0B5FA5] text-white">Member</Badge>
                    </TableCell>
                    <TableCell>15/09/2024</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Hiện tại
                      </Badge>
                    </TableCell>
                    <TableCell>System</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">Guest</Badge>
                    </TableCell>
                    <TableCell>10/09/2024</TableCell>
                    <TableCell>14/09/2024</TableCell>
                    <TableCell>System</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Lưu ý:</strong> Nếu bạn muốn thay đổi vai trò, vui lòng liên hệ với quản trị viên hệ thống 
                  hoặc gửi yêu cầu qua trang <span className="text-[#0B5FA5]">Trợ giúp & Hỗ trợ</span>.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
