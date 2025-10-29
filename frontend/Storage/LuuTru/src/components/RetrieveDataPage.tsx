import React, { useState } from 'react';
import { Search, Filter, Database, Download, Eye, Calendar, User, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface RetrieveDataPageProps {
  onBack: () => void;
  role: string;
}

export const RetrieveDataPage: React.FC<RetrieveDataPageProps> = ({ onBack, role }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataType, setDataType] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const dataTypes = [
    { value: 'all', label: 'Tất cả dữ liệu' },
    { value: 'evaluations', label: 'Đánh giá' },
    { value: 'meetings', label: 'Biên bản buổi gặp' },
    { value: 'materials', label: 'Tài liệu học tập' },
    { value: 'progress', label: 'Tiến độ học tập' },
    { value: 'schedule', label: 'Lịch trình' },
    { value: 'profiles', label: 'Hồ sơ cá nhân' }
  ];

  const mockResults = [
    {
      id: 1,
      type: 'evaluation',
      title: 'Đánh giá Lập trình Python - Nguyễn Văn A',
      date: '15/10/2025',
      description: 'Điểm: 8.5 - Môn: Lập trình Python',
      icon: FileText
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Buổi gặp tuần 1 - Review tiến độ',
      date: '15/10/2025',
      description: 'Phòng A101, 5 người tham gia',
      icon: Calendar
    },
    {
      id: 3,
      type: 'profile',
      title: 'Hồ sơ sinh viên - Nguyễn Văn A',
      date: '01/09/2025',
      description: 'MSSV: 2012345, Khoa KHMT',
      icon: User
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
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
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
                <Search className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-gray-900">Truy xuất dữ liệu</h2>
                <p className="text-gray-600">Tìm kiếm và truy xuất dữ liệu từ hệ thống</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Filter className="text-[#003B7A]" size={20} />
          </div>
          <h3 className="text-gray-900">Bộ lọc tìm kiếm</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">Từ khóa</Label>
            <Input
              id="search"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="dataType">Loại dữ liệu</Label>
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại dữ liệu" />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fromDate">Từ ngày</Label>
            <Input
              id="fromDate"
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="toDate">Đến ngày</Label>
            <Input
              id="toDate"
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setDataType('all');
            setDateRange({ from: '', to: '' });
            setResults([]);
          }}>
            Xóa bộ lọc
          </Button>
          <Button onClick={handleSearch} className="gap-2 bg-gradient-to-r from-[#003B7A] to-[#0059b3] hover:from-[#00447a] hover:to-[#0066c0] shadow-lg shadow-blue-500/30" disabled={isSearching}>
            <Search size={18} />
            {isSearching ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Kết quả tìm kiếm ({results.length})</h3>
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              Xuất kết quả
            </Button>
          </div>

          <div className="space-y-3">
            {results.map((result) => {
              const Icon = result.icon;
              return (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-blue-50/50 hover:border-[#003B7A]/30 transition-all shadow-sm"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800">{result.title}</h4>
                      <p className="text-gray-600 mt-1">{result.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-500">
                          <Calendar size={14} className="inline mr-1" />
                          {result.date}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          result.type === 'evaluation' ? 'bg-purple-100 text-purple-700' :
                          result.type === 'meeting' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {dataTypes.find(t => t.value === result.type + 's')?.label || result.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye size={16} />
                      Xem
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download size={16} />
                      Tải về
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Database className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-gray-800 mb-2">Chưa có kết quả tìm kiếm</h3>
          <p className="text-gray-600">
            Sử dụng bộ lọc phía trên để tìm kiếm dữ liệu trong hệ thống
          </p>
        </div>
      )}
    </div>
  );
};
