import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ProfilePageProps {
  role: string;
  onBack: () => void;
  userName: string;
  userEmail: string;
  userId: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ role, onBack, userName, userEmail, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const getInitialProfile = () => {
    const baseProfile = {
      name: userName,
      email: userEmail,
      phone: '0912345678',
      studentId: userId,
      address: role === 'student' ? 'Ký túc xá khu A, ĐHQG TP.HCM' : '268 Lý Thường Kiệt, P.14, Q.10, TP.HCM',
      dateOfBirth: '01/01/1990'
    };

    if (role === 'student') {
      return {
        ...baseProfile,
        faculty: 'Khoa Khoa học và Kỹ thuật Máy tính',
        major: 'Khoa học Máy tính',
        year: '3'
      };
    } else if (role === 'tutor') {
      return {
        ...baseProfile,
        faculty: 'Khoa Khoa học và Kỹ thuật Máy tính',
        position: 'Trợ giảng',
        specialization: 'Lập trình và Cấu trúc dữ liệu'
      };
    } else if (role === 'coordinator') {
      return {
        ...baseProfile,
        department: 'Phòng Đào tạo',
        position: 'Điều phối viên chương trình Tutor',
        experience: '5 năm'
      };
    } else {
      return {
        ...baseProfile,
        department: 'Phòng Công nghệ Thông tin',
        position: 'Quản trị viên hệ thống',
        experience: '8 năm'
      };
    }
  };

  const [profile, setProfile] = useState(getInitialProfile());

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#003B7A] to-[#0059b3] rounded-xl shadow-lg">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-gray-900">Hồ sơ cá nhân</h2>
                <p className="text-gray-600">Thông tin cá nhân và học tập</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="gap-2 bg-gradient-to-r from-[#003B7A] to-[#0059b3] hover:from-[#00447a] hover:to-[#0066c0] shadow-lg shadow-blue-500/30">
                <Edit size={18} />
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/30">
                  <Save size={18} />
                  Lưu thay đổi
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#003B7A] to-[#0059b3] rounded-full flex items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
                  <span className="text-white text-3xl font-bold">{userName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}</span>
                </div>
                <div className="absolute bottom-3 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <h3 className="text-gray-900">{profile.name}</h3>
              <p className="text-gray-600">
                {role === 'student' ? 'MSSV' : 'Mã NV'}: {profile.studentId}
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={18} />
                <span>{profile.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} />
                <span>{profile.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-gray-800 mb-4">
                {role === 'student' ? 'Thông tin học tập' : 'Thông tin công việc'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">
                    {role === 'student' ? 'Mã số sinh viên' : 'Mã nhân viên'}
                  </Label>
                  <Input
                    id="studentId"
                    value={profile.studentId}
                    disabled
                  />
                </div>
                {role === 'student' && (
                  <>
                    <div>
                      <Label htmlFor="faculty">Khoa</Label>
                      <Input
                        id="faculty"
                        value={profile.faculty}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, faculty: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Ngành</Label>
                      <Input
                        id="major"
                        value={profile.major}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Năm học</Label>
                      <Input
                        id="year"
                        value={profile.year}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                      />
                    </div>
                  </>
                )}
                {role === 'tutor' && (
                  <>
                    <div>
                      <Label htmlFor="faculty">Khoa</Label>
                      <Input
                        id="faculty"
                        value={profile.faculty}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, faculty: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Chuyên môn</Label>
                      <Input
                        id="specialization"
                        value={profile.specialization}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                      />
                    </div>
                  </>
                )}
                {(role === 'coordinator' || role === 'admin') && (
                  <>
                    <div>
                      <Label htmlFor="department">Phòng ban</Label>
                      <Input
                        id="department"
                        value={profile.department}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Kinh nghiệm</Label>
                      <Input
                        id="experience"
                        value={profile.experience}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input
                    id="dateOfBirth"
                    value={profile.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-gray-900 mb-4">Thống kê hoạt động</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <p className="text-blue-700">Tài liệu</p>
                  <p className="text-gray-900 mt-1">156</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <p className="text-green-700">Buổi gặp</p>
                  <p className="text-gray-900 mt-1">24</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <p className="text-purple-700">Đánh giá</p>
                  <p className="text-gray-900 mt-1">8.5</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <p className="text-orange-700">Tiến độ</p>
                  <p className="text-gray-900 mt-1">75%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
