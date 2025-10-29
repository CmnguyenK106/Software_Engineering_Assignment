import React, { useState } from 'react';
import { X, Plus, Search, Edit, Trash2, Download, Upload, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface DataManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'evaluation' | 'meeting' | 'material' | 'progress' | 'schedule';
  mode: 'create' | 'edit' | 'view';
  data?: any;
}

export const DataManagementDialog: React.FC<DataManagementDialogProps> = ({
  isOpen,
  onClose,
  type,
  mode,
  data
}) => {
  const [formData, setFormData] = useState(data || {});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const titles = {
    evaluation: 'Đánh giá',
    meeting: 'Biên bản buổi gặp',
    material: 'Tài liệu học tập',
    progress: 'Tiến độ học tập',
    schedule: 'Lịch trình'
  };

  const handleSave = () => {
    console.log('Saving:', formData);
    onClose();
  };

  const handleDelete = () => {
    console.log('Deleting:', data);
    setShowDeleteConfirm(false);
    onClose();
  };

  const renderForm = () => {
    switch (type) {
      case 'evaluation':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Sinh viên</Label>
              <Input
                id="student"
                value={formData.student || ''}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="subject">Môn học</Label>
              <Input
                id="subject"
                value={formData.subject || ''}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="score">Điểm số</Label>
              <Input
                id="score"
                type="number"
                step="0.1"
                value={formData.score || ''}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="date">Ngày đánh giá</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="comment">Nhận xét</Label>
              <Textarea
                id="comment"
                value={formData.comment || ''}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                disabled={mode === 'view'}
                rows={4}
              />
            </div>
          </div>
        );

      case 'meeting':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề buổi gặp</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Ngày</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <Label htmlFor="time">Thời gian</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="attendees">Số lượng người tham gia</Label>
              <Input
                id="attendees"
                type="number"
                value={formData.attendees || ''}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={mode === 'view'}
                rows={4}
              />
            </div>
          </div>
        );

      case 'material':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tên tài liệu</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="category">Danh mục</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                disabled={mode === 'view'}
              >
                <option value="">Chọn danh mục</option>
                <option value="Bài giảng">Bài giảng</option>
                <option value="Bài tập">Bài tập</option>
                <option value="Tham khảo">Tham khảo</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            {mode === 'create' && (
              <div>
                <Label htmlFor="file">Tải lên tài liệu</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600">Kéo thả file hoặc click để chọn</p>
                  <p className="text-gray-400 mt-1">PDF, DOCX, PPTX (tối đa 50MB)</p>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={mode === 'view'}
                rows={4}
              />
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Sinh viên</Label>
              <Input
                id="student"
                value={formData.student || ''}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="completed">Số bài hoàn thành</Label>
                <Input
                  id="completed"
                  type="number"
                  value={formData.completed || ''}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <Label htmlFor="total">Tổng số bài</Label>
                <Input
                  id="total"
                  type="number"
                  value={formData.total || ''}
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>
            </div>
            <div>
              <Label>Tiến độ: {Math.round((formData.completed / formData.total) * 100) || 0}%</Label>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${Math.round((formData.completed / formData.total) * 100) || 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={mode === 'view'}
                rows={4}
              />
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Ngày</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <Label htmlFor="time">Thời gian</Label>
                <Input
                  id="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={mode === 'view'}
                  placeholder="08:00 - 10:00"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={mode === 'view'}
              />
            </div>
            <div>
              <Label htmlFor="type">Loại</Label>
              <select
                id="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                disabled={mode === 'view'}
              >
                <option value="">Chọn loại</option>
                <option value="Lớp học">Lớp học</option>
                <option value="Tư vấn">Tư vấn</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Họp">Họp</option>
              </select>
            </div>
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={mode === 'view'}
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' && `Thêm ${titles[type]}`}
              {mode === 'edit' && `Chỉnh sửa ${titles[type]}`}
              {mode === 'view' && `Chi tiết ${titles[type]}`}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create' && `Điền thông tin để thêm ${titles[type].toLowerCase()} mới`}
              {mode === 'edit' && `Chỉnh sửa thông tin ${titles[type].toLowerCase()}`}
              {mode === 'view' && `Xem chi tiết thông tin ${titles[type].toLowerCase()}`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {renderForm()}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            {mode === 'view' ? (
              <>
                <Button variant="outline" onClick={onClose}>
                  Đóng
                </Button>
                <Button onClick={() => console.log('Edit mode')} className="gap-2">
                  <Edit size={18} />
                  Chỉnh sửa
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                {mode === 'edit' && (
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="gap-2"
                  >
                    <Trash2 size={18} />
                    Xóa
                  </Button>
                )}
                <Button onClick={handleSave} className="gap-2">
                  <Plus size={18} />
                  {mode === 'create' ? 'Thêm mới' : 'Lưu thay đổi'}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-red-600" />
              Xác nhận xóa
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {titles[type].toLowerCase()} này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
