import React, { useState } from 'react';
import { Save, Download, Upload, Database, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from './ui/alert';

interface BackupPageProps {
  onBack: () => void;
}

export const BackupPage: React.FC<BackupPageProps> = ({ onBack }) => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState('16/10/2025 14:30');

  const backupHistory = [
    { id: 1, date: '16/10/2025 14:30', size: '245 MB', status: 'Thành công', type: 'Tự động' },
    { id: 2, date: '15/10/2025 14:30', size: '243 MB', status: 'Thành công', type: 'Tự động' },
    { id: 3, date: '14/10/2025 14:30', size: '241 MB', status: 'Thành công', type: 'Tự động' },
    { id: 4, date: '13/10/2025 10:15', size: '239 MB', status: 'Thành công', type: 'Thủ công' },
    { id: 5, date: '12/10/2025 14:30', size: '238 MB', status: 'Thành công', type: 'Tự động' }
  ];

  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          setLastBackup(new Date().toLocaleString('vi-VN'));
          return 100;
        }
        return prev + 10;
      });
    }, 300);
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
              <Database size={20} className="text-gray-600" />
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/30">
                <Save className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-gray-900">Sao lưu dữ liệu</h2>
                <p className="text-gray-600">Quản lý sao lưu và khôi phục dữ liệu hệ thống</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/30">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600">Lần sao lưu cuối</p>
              <p className="text-gray-800">{lastBackup}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <Database className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600">Dung lượng</p>
              <p className="text-gray-800">245 MB / 10 GB</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/30">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600">Tần suất</p>
              <p className="text-gray-800">Hàng ngày lúc 14:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-gray-900 mb-4">Thao tác sao lưu</h3>
        
        {isBackingUp && (
          <Alert className="mb-4">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Đang sao lưu dữ liệu...</AlertTitle>
            <AlertDescription>
              <Progress value={backupProgress} className="mt-2" />
              <p className="mt-2">{backupProgress}% hoàn thành</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50/30">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-fit mb-3 shadow-lg shadow-blue-500/30">
              <Save className="text-white" size={24} />
            </div>
            <h4 className="text-gray-900 mb-2">Sao lưu toàn bộ</h4>
            <p className="text-gray-600 mb-4">Sao lưu tất cả dữ liệu trong hệ thống</p>
            <Button 
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30" 
              onClick={handleBackup}
              disabled={isBackingUp}
            >
              <Save size={18} />
              Sao lưu ngay
            </Button>
          </div>

          <div className="border border-gray-100 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-green-50/30">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl w-fit mb-3 shadow-lg shadow-green-500/30">
              <Download className="text-white" size={24} />
            </div>
            <h4 className="text-gray-800 mb-2">Tải về backup</h4>
            <p className="text-gray-600 mb-4">Tải về file backup mới nhất</p>
            <Button variant="outline" className="w-full gap-2">
              <Download size={18} />
              Tải về
            </Button>
          </div>

          <div className="border border-gray-100 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50/30">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-fit mb-3 shadow-lg shadow-purple-500/30">
              <Upload className="text-white" size={24} />
            </div>
            <h4 className="text-gray-800 mb-2">Khôi phục dữ liệu</h4>
            <p className="text-gray-600 mb-4">Khôi phục từ file backup</p>
            <Button variant="outline" className="w-full gap-2">
              <Upload size={18} />
              Khôi phục
            </Button>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800">Lịch sử sao lưu</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Xuất danh sách
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-gray-700">Thời gian</th>
                <th className="text-left px-6 py-4 text-gray-700">Dung lượng</th>
                <th className="text-left px-6 py-4 text-gray-700">Loại</th>
                <th className="text-left px-6 py-4 text-gray-700">Trạng thái</th>
                <th className="text-right px-6 py-4 text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {backupHistory.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      {backup.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{backup.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      backup.type === 'Tự động' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <CheckCircle size={14} />
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download size={16} />
                        Tải về
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <RefreshCw size={16} />
                        Khôi phục
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-800 mb-4">Cài đặt sao lưu tự động</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-gray-800">Sao lưu tự động hàng ngày</p>
              <p className="text-gray-600">Hệ thống sẽ tự động sao lưu vào lúc 14:30 mỗi ngày</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-gray-800">Giữ lại backup trong 30 ngày</p>
              <p className="text-gray-600">Tự động xóa các backup cũ hơn 30 ngày</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
