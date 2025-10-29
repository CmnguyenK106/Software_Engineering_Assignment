import { useState } from 'react';
import { NotificationCenter } from './components/NotificationCenter';
import { SendNotifications } from './components/SendNotifications';
import { SystemAlerts } from './components/SystemAlerts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import logoImage from 'figma:asset/c5b3a5b2ef67f8273f01c5a97b5ce1561c43a92f.png';

export default function App() {
  const [userRole, setUserRole] = useState<'user' | 'department' | 'admin'>('user');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0066CC] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5">
                <img src={logoImage} alt="HCMUT Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg">HCMUT - Tutor Support</h1>
                <p className="text-xs text-blue-100">Hệ thống Thông báo & Nhắc lịch</p>
              </div>
            </div>

            {/* Role Selector (Demo purposes) */}
            <div className="flex items-center gap-3">
              <Select value={userRole} onValueChange={(v: any) => setUserRole(v)}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Mentee / Tutor</SelectItem>
                  <SelectItem value="department">Phòng ban</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Content based on role */}
      <div>
        {userRole === 'user' && <NotificationCenter />}
        {userRole === 'department' && <SendNotifications />}
        {userRole === 'admin' && <SystemAlerts />}
      </div>
    </div>
  );
}
