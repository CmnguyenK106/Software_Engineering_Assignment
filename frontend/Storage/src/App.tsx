import React, { useState } from 'react';
import { FileText, Calendar, User, BookOpen, TrendingUp, Search, Upload, Download, Edit, Trash2, RefreshCw, Database, Library, Home, Menu, X, Save, Clock, Award, Users, ClipboardList, Plus, GraduationCap, BarChart3, Settings, CheckCircle } from 'lucide-react';
import { ProfilePage } from './components/ProfilePage';
import { DataManagementDialog } from './components/DataManagementDialog';
import { RetrieveDataPage } from './components/RetrieveDataPage';
import { BackupPage } from './components/BackupPage';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';
import hcmutLogo from 'figma:asset/2c1067e0ae24cefac464ae0130f7ef7ca0c3aa02.png';

const TutorSupportSystem = () => {
  const [currentRole, setCurrentRole] = useState('student');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [syncStatus, setSyncStatus] = useState({
    datacore: true,
    library: true
  });
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'evaluation' as 'evaluation' | 'meeting' | 'material' | 'progress' | 'schedule',
    mode: 'create' as 'create' | 'edit' | 'view',
    data: null
  });

  const roles = {
    student: { name: 'Sinh viên', color: 'blue', icon: GraduationCap },
    tutor: { name: 'Tutor', color: 'green', icon: Users },
    coordinator: { name: 'Điều phối viên', color: 'purple', icon: BarChart3 },
    admin: { name: 'Quản trị viên', color: 'red', icon: Settings }
  };

  const userProfiles = {
    student: {
      name: 'Nguyễn Văn A',
      studentId: '2112345',
      email: 'an.nguyen@hcmut.edu.vn',
      avatar: 'NVA'
    },
    tutor: {
      name: 'Nguyễn Văn B',
      studentId: 'T001',
      email: 'binh.tran@hcmut.edu.vn',
      avatar: 'TTB'
    },
    coordinator: {
      name: 'Nguyễn Văn C',
      studentId: 'C001',
      email: 'cuong.le@hcmut.edu.vn',
      avatar: 'LMC'
    },
    admin: {
      name: 'Nguyễn Văn D',
      studentId: 'A001',
      email: 'dung.pham@hcmut.edu.vn',
      avatar: 'PHD'
    }
  };

  const menuItems = {
    student: [
      { id: 'evaluations', name: 'Lưu trữ đánh giá', icon: Award, description: 'Xem và lưu trữ đánh giá của bạn', color: 'from-purple-500 to-purple-600' },
      { id: 'profile', name: 'Lưu trữ hồ sơ cá nhân', icon: User, description: 'Quản lý thông tin cá nhân', color: 'from-blue-500 to-blue-600' },
      { id: 'meetings', name: 'Lưu trữ biên bản buổi gặp', icon: ClipboardList, description: 'Lịch sử buổi gặp và biên bản', color: 'from-green-500 to-green-600' },
      { id: 'materials', name: 'Lưu trữ tài liệu học tập', icon: BookOpen, description: 'Tài liệu và bài giảng', color: 'from-orange-500 to-orange-600' },
      { id: 'retrieve', name: 'Truy xuất dữ liệu đã lưu', icon: Search, description: 'Tìm kiếm dữ liệu của bạn', color: 'from-indigo-500 to-indigo-600' }
    ],
    tutor: [
      { id: 'evaluations', name: 'Lưu trữ đánh giá', icon: Award, description: 'Đánh giá sinh viên', color: 'from-purple-500 to-purple-600' },
      { id: 'profile', name: 'Lưu trữ hồ sơ cá nhân', icon: User, description: 'Thông tin cá nhân', color: 'from-blue-500 to-blue-600' },
      { id: 'meetings', name: 'Lưu trữ biên bản buổi gặp', icon: ClipboardList, description: 'Quản lý buổi gặp', color: 'from-green-500 to-green-600' },
      { id: 'materials', name: 'Lưu trữ tài liệu học tập', icon: BookOpen, description: 'Upload tài liệu', color: 'from-orange-500 to-orange-600' },
      { id: 'progress', name: 'Lưu trữ tiến độ học tập', icon: TrendingUp, description: 'Theo dõi sinh viên', color: 'from-cyan-500 to-cyan-600' },
      { id: 'schedule', name: 'Lưu trữ lịch trình', icon: Calendar, description: 'Quản lý lịch', color: 'from-pink-500 to-pink-600' },
      { id: 'retrieve', name: 'Truy xuất dữ liệu đã lưu', icon: Search, description: 'Tìm kiếm dữ liệu', color: 'from-indigo-500 to-indigo-600' }
    ],
    coordinator: [
      { id: 'retrieve', name: 'Truy xuất dữ liệu đã lưu', icon: Search, description: 'Truy xuất thông tin', color: 'from-indigo-500 to-indigo-600' },
      { id: 'update', name: 'Cập nhật dữ liệu', icon: Edit, description: 'Chỉnh sửa dữ liệu', color: 'from-blue-500 to-blue-600' },
      { id: 'delete', name: 'Xóa dữ liệu', icon: Trash2, description: 'Xóa dữ liệu cũ', color: 'from-red-500 to-red-600' }
    ],
    admin: [
      { id: 'retrieve', name: 'Truy xuất dữ liệu đã lưu', icon: Search, description: 'Quản lý toàn bộ dữ liệu', color: 'from-indigo-500 to-indigo-600' },
      { id: 'update', name: 'Cập nhật dữ liệu', icon: Edit, description: 'Cập nhật hệ thống', color: 'from-blue-500 to-blue-600' },
      { id: 'delete', name: 'Xóa dữ liệu', icon: Trash2, description: 'Xóa dữ liệu', color: 'from-red-500 to-red-600' },
      { id: 'backup', name: 'Sao lưu dữ liệu', icon: Save, description: 'Sao lưu toàn bộ hệ thống', color: 'from-green-500 to-green-600' },
      { id: 'sync', name: 'Đồng bộ hệ thống', icon: RefreshCw, description: 'Đồng bộ với DATACORE & LIBRARY', color: 'from-purple-500 to-purple-600' },
      { id: 'users', name: 'Quản lý người dùng', icon: Users, description: 'Quản lý tài khoản', color: 'from-orange-500 to-orange-600' }
    ]
  };

  const sampleData = {
    evaluations: [
      { id: 1, student: 'Nguyễn Văn A', subject: 'Lập trình Python', score: 8.0, date: '15/10/2025', status: 'Hoàn thành' },
      { id: 2, student: 'Nguyễn Văn A', subject: 'Cấu trúc dữ liệu', score: 8.0, date: '14/10/2025', status: 'Hoàn thành' },
      { id: 3, student: 'Nguyễn Văn A', subject: 'Cơ sở dữ liệu', score: 8.0, date: '13/10/2025', status: 'Hoàn thành' }
    ],
    meetings: [
      { id: 1, title: 'Buổi gặp tuần 1 - Review tiến độ', date: '15/10/2025', time: '14:00', location: 'Phòng A101', attendees: 5, status: 'Hoàn thành' },
      { id: 2, title: 'Buổi gặp tuần 2 - Thảo luận đề tài', date: '22/10/2025', time: '14:00', location: 'Phòng A101', attendees: 5, status: 'Đã lên lịch' },
      { id: 3, title: 'Họp nhóm - Presentation', date: '25/10/2025', time: '10:00', location: 'Online', attendees: 8, status: 'Đã lên lịch' }
    ],
    materials: [
      { id: 1, title: 'Bài giảng tuần 1 - Giới thiệu Python.pdf', size: '2.5 MB', uploadDate: '01/10/2025', downloads: 45, category: 'Bài giảng' },
      { id: 2, title: 'Slide bài tập - Vòng lặp.pptx', size: '4.1 MB', uploadDate: '08/10/2025', downloads: 38, category: 'Bài tập' },
      { id: 3, title: 'Tài liệu tham khảo - Algorithm.pdf', size: '8.3 MB', uploadDate: '10/10/2025', downloads: 52, category: 'Tham khảo' }
    ],
    progress: [
      { id: 1, student: 'Nguyễn Văn A', completed: 12, total: 15, percentage: 80, lastUpdate: '16/10/2025' },
      { id: 2, student: 'Trần Thị B', completed: 14, total: 15, percentage: 93, lastUpdate: '16/10/2025' },
      { id: 3, student: 'Lê Văn C', completed: 10, total: 15, percentage: 67, lastUpdate: '15/10/2025' }
    ],
    schedule: [
      { id: 1, title: 'Lớp học Python Cơ bản', date: '18/10/2025', time: '08:00 - 10:00', location: 'Phòng B201', type: 'Lớp học' },
      { id: 2, title: 'Tư vấn học tập 1-1', date: '19/10/2025', time: '14:00 - 15:00', location: 'Phòng Tutor', type: 'Tư vấn' },
      { id: 3, title: 'Seminar công nghệ AI', date: '20/10/2025', time: '13:00 - 16:00', location: 'Hội trường A', type: 'Sự kiện' }
    ]
  };

  const handleSync = (system: 'datacore' | 'library') => {
    setSyncStatus(prev => ({ ...prev, [system]: false }));
    toast.info(`Đang đồng bộ với ${system === 'datacore' ? 'HCMUT_DATACORE' : 'HCMUT_LIBRARY'}...`);
    
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, [system]: true }));
      toast.success(`Đồng bộ với ${system === 'datacore' ? 'HCMUT_DATACORE' : 'HCMUT_LIBRARY'} thành công!`);
    }, 2000);
  };

  const handlePageChange = (pageId: string) => {
    if (pageId === 'profile') {
      setCurrentPage('profile');
    } else if (pageId === 'retrieve') {
      setCurrentPage('retrieve');
    } else if (pageId === 'backup') {
      setCurrentPage('backup');
    } else if (pageId === 'update') {
      toast.info('Chức năng cập nhật dữ liệu');
      setCurrentPage(pageId);
    } else if (pageId === 'delete') {
      toast.info('Chức năng xóa dữ liệu');
      setCurrentPage(pageId);
    } else if (pageId === 'sync') {
      handleSync('datacore');
      handleSync('library');
    } else if (pageId === 'users') {
      toast.info('Chức năng quản lý người dùng');
    } else {
      setCurrentPage(pageId);
    }
  };

  const renderDashboard = () => {
    const items = menuItems[currentRole] || [];
    const RoleIcon = roles[currentRole].icon;
    
    return (
      <div className="space-y-8">
        {/* Welcome Section with HCMUT Branding */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#003B7A] to-[#0059b3] rounded-2xl p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <RoleIcon size={32} />
              </div>
              <div>
                <p className="text-blue-100">Xin chào,</p>
                <h2 className="text-white">
                  {roles[currentRole].name} - {userProfiles[currentRole].name}
                </h2>
              </div>
            </div>
            <p className="text-blue-100">
              Hệ thống hỗ trợ giảng dạy - Trường Đại học Bách Khoa TP.HCM
            </p>
            <Badge className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Clock size={14} className="mr-1" />
              {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Badge>
          </div>
        </div>

        {/* Quick Stats - Different for each role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Common stats for all roles */}
          <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                  <BookOpen size={24} className="text-white" />
                </div>
                <TrendingUp className="text-blue-500" size={20} />
              </div>
              <p className="text-gray-600">Tổng tài liệu</p>
              <p className="text-gray-900 mt-1">156</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg shadow-green-500/30">
                  <ClipboardList size={24} className="text-white" />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <p className="text-gray-600">
                {currentRole === 'student' ? 'Buổi gặp đã tham gia' : 'Tổng buổi gặp'}
              </p>
              <p className="text-gray-900 mt-1">24</p>
            </div>
          </div>

          {/* Student-specific stats: Grade and Progress */}
          {currentRole === 'student' && (
            <>
              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                      <Award size={24} className="text-white" />
                    </div>
                    <TrendingUp className="text-purple-500" size={20} />
                  </div>
                  <p className="text-gray-600">Điểm trung bình</p>
                  <p className="text-gray-900 mt-1">8.0</p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <span className="text-orange-500">+5%</span>
                  </div>
                  <p className="text-gray-600">Tiến độ học tập</p>
                  <p className="text-gray-900 mt-1">75%</p>
                </div>
              </div>
            </>
          )}

          {/* Tutor stats */}
          {currentRole === 'tutor' && (
            <>
              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                      <Users size={24} className="text-white" />
                    </div>
                    <TrendingUp className="text-purple-500" size={20} />
                  </div>
                  <p className="text-gray-600">Sinh viên đang dạy</p>
                  <p className="text-gray-900 mt-1">42</p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30">
                      <Award size={24} className="text-white" />
                    </div>
                    <span className="text-orange-500">4.8/5</span>
                  </div>
                  <p className="text-gray-600">Đánh giá</p>
                  <p className="text-gray-900 mt-1">Xuất sắc</p>
                </div>
              </div>
            </>
          )}

          {/* Coordinator stats */}
          {currentRole === 'coordinator' && (
            <>
              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                      <Users size={24} className="text-white" />
                    </div>
                    <TrendingUp className="text-purple-500" size={20} />
                  </div>
                  <p className="text-gray-600">Tutor đang quản lý</p>
                  <p className="text-gray-900 mt-1">12</p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30">
                      <Database size={24} className="text-white" />
                    </div>
                    <span className="text-orange-500">98%</span>
                  </div>
                  <p className="text-gray-600">Dữ liệu đã xử lý</p>
                  <p className="text-gray-900 mt-1">1,248</p>
                </div>
              </div>
            </>
          )}

          {/* Admin stats */}
          {currentRole === 'admin' && (
            <>
              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30">
                      <Users size={24} className="text-white" />
                    </div>
                    <TrendingUp className="text-purple-500" size={20} />
                  </div>
                  <p className="text-gray-600">Tổng người dùng</p>
                  <p className="text-gray-900 mt-1">328</p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30">
                      <Database size={24} className="text-white" />
                    </div>
                    <span className="text-green-500">
                      <CheckCircle size={20} />
                    </span>
                  </div>
                  <p className="text-gray-600">Trạng thái hệ thống</p>
                  <p className="text-gray-900 mt-1">Tốt</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Use Cases from Diagram */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900">Chức năng chính</h3>
              <p className="text-gray-600 mt-1">Quản lý và truy cập các chức năng hệ thống</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#003B7A]/30 transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity" 
                       style={{ backgroundImage: `linear-gradient(135deg, var(--hcmut-blue), var(--hcmut-red))` }}></div>
                  <div className="relative flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 group-hover:text-[#003B7A] transition-colors mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* External Systems Integration */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900">Hệ thống liên kết</h3>
              <p className="text-gray-600 mt-1">Đồng bộ dữ liệu với các hệ thống bên ngoài</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
                    <Database className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900">HCMUT_DATACORE</h4>
                    <p className="text-gray-600">Hệ thống dữ liệu trung tâm</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${syncStatus.datacore ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                  <span className="text-gray-600">{syncStatus.datacore ? 'Đã kết nối' : 'Đang đồng bộ'}</span>
                </div>
              </div>
              <button
                onClick={() => handleSync('datacore')}
                disabled={!syncStatus.datacore}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all"
              >
                <RefreshCw size={18} className={!syncStatus.datacore ? 'animate-spin' : ''} />
                {syncStatus.datacore ? 'Đồng bộ ngay' : 'Đang đồng bộ...'}
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg shadow-pink-500/30">
                    <Library className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900">HCMUT_LIBRARY</h4>
                    <p className="text-gray-600">Thư viện trực tuyến</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${syncStatus.library ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                  <span className="text-gray-600">{syncStatus.library ? 'Đã kết nối' : 'Đang đồng bộ'}</span>
                </div>
              </div>
              <button
                onClick={() => handleSync('library')}
                disabled={!syncStatus.library}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition-all"
              >
                <RefreshCw size={18} className={!syncStatus.library ? 'animate-spin' : ''} />
                {syncStatus.library ? 'Đồng bộ ngay' : 'Đang đồng bộ...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataTable = (pageId: string) => {
    const pageConfig: any = {
      evaluations: { title: 'Lưu trữ đánh giá', icon: Award, data: sampleData.evaluations, type: 'evaluation' },
      meetings: { title: 'Lưu trữ biên bản buổi gặp', icon: ClipboardList, data: sampleData.meetings, type: 'meeting' },
      materials: { title: 'Lưu trữ tài liệu học tập', icon: BookOpen, data: sampleData.materials, type: 'material' },
      progress: { title: 'Lưu trữ tiến độ học tập', icon: TrendingUp, data: sampleData.progress, type: 'progress' },
      schedule: { title: 'Lưu trữ lịch trình', icon: Calendar, data: sampleData.schedule, type: 'schedule' },
      update: { title: 'Cập nhật dữ liệu', icon: Edit, data: sampleData.materials, type: 'material' },
      delete: { title: 'Xóa dữ liệu', icon: Trash2, data: sampleData.materials, type: 'material' }
    };

    const config = pageConfig[pageId] || pageConfig.materials;
    const Icon = config.icon;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home size={20} className="text-gray-600" />
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#003B7A] to-[#0059b3] rounded-xl shadow-lg">
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-gray-900">{config.title}</h2>
                  <p className="text-gray-600">Quản lý và theo dõi dữ liệu</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setDialogState({
                  isOpen: true,
                  type: config.type,
                  mode: 'create',
                  data: null
                })}
                className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2 shadow-lg shadow-green-500/30 transition-all"
              >
                <Plus size={18} />
                Thêm mới
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-[#003B7A] to-[#0059b3] text-white rounded-lg hover:from-[#00447a] hover:to-[#0066c0] flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all">
                <Download size={18} />
                Xuất file
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm trong bảng..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] focus:border-transparent bg-gray-50"
              />
            </div>
            <button className="px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Save size={18} className="text-gray-600" />
              <span className="text-gray-700">Sao lưu</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    {Object.keys(config.data[0] || {}).filter(k => k !== 'id').map((key) => (
                      <th key={key} className="text-left px-6 py-4 text-gray-700">
                        {key === 'student' ? 'Sinh viên' :
                         key === 'title' ? 'Tiêu đề' :
                         key === 'date' ? 'Ngày' :
                         key === 'score' ? 'Điểm' :
                         key === 'status' ? 'Trạng thái' :
                         key === 'size' ? 'Kích thước' :
                         key === 'time' ? 'Thời gian' :
                         key === 'location' ? 'Địa điểm' :
                         key === 'completed' ? 'Hoàn thành' :
                         key === 'total' ? 'Tổng' :
                         key === 'percentage' ? 'Tỷ lệ' :
                         key === 'type' ? 'Loại' :
                         key}
                      </th>
                    ))}
                    <th className="text-right px-6 py-4 text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {config.data.map((row: any) => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      {Object.entries(row).filter(([key]) => key !== 'id').map(([key, value]: any) => (
                        <td key={key} className="px-6 py-4 text-gray-700">
                          {key === 'status' ? (
                            <Badge variant={value === 'Hoàn thành' ? 'default' : 'secondary'} 
                                   className={value === 'Hoàn thành' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}>
                              {value}
                            </Badge>
                          ) : key === 'percentage' ? (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-[#003B7A] to-[#0059b3] h-2.5 rounded-full transition-all"
                                  style={{ width: `${value}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-900 min-w-[3rem]">{value}%</span>
                            </div>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setDialogState({
                              isOpen: true,
                              type: config.type,
                              mode: 'view',
                              data: row
                            })}
                            className="p-2 hover:bg-blue-50 rounded-lg text-[#003B7A] transition-colors"
                            title="Xem chi tiết"
                          >
                            <Search size={18} />
                          </button>
                          <button 
                            onClick={() => setDialogState({
                              isOpen: true,
                              type: config.type,
                              mode: 'edit',
                              data: row
                            })}
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                                  title="Xóa">
                            <Trash2 size={18} />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                                  title="Tải xuống">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const currentUser = userProfiles[currentRole];
    
    if (currentPage === 'dashboard') {
      return renderDashboard();
    } else if (currentPage === 'profile') {
      return (
        <ProfilePage 
          role={currentRole} 
          onBack={() => setCurrentPage('dashboard')} 
          userName={currentUser.name}
          userEmail={currentUser.email}
          userId={currentUser.studentId}
        />
      );
    } else if (currentPage === 'retrieve') {
      return <RetrieveDataPage role={currentRole} onBack={() => setCurrentPage('dashboard')} />;
    } else if (currentPage === 'backup') {
      return <BackupPage onBack={() => setCurrentPage('dashboard')} />;
    } else {
      return renderDataTable(currentPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Toaster />
      
      {/* Header with HCMUT Branding */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                  <img src={hcmutLogo} alt="BK TP.HCM Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <h1 className="text-gray-900">Tutor Support System</h1>
                <p className="text-gray-600">Trường ĐH Bách Khoa TP.HCM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  setCurrentPage('dashboard');
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-white text-gray-700 shadow-sm hover:border-[#003B7A] transition-colors"
              >
                {Object.entries(roles).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#003B7A] to-[#0059b3] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {userProfiles[currentRole].avatar}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-gray-900">{userProfiles[currentRole].name}</p>
                  <p className="text-gray-600">{roles[currentRole].name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {/* Data Management Dialog */}
      <DataManagementDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        type={dialogState.type}
        mode={dialogState.mode}
        data={dialogState.data}
      />
    </div>
  );
};

export default TutorSupportSystem;
