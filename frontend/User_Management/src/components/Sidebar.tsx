import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Star, 
  BarChart3, 
  Settings 
} from "lucide-react";
import { cn } from "./ui/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Users, label: "Quản lý Người dùng", active: true },
  { icon: Calendar, label: "Lịch & Phiên tư vấn", active: false },
  { icon: MessageSquare, label: "Nhắn tin", active: false },
  { icon: BookOpen, label: "Tài nguyên", active: false },
  { icon: Star, label: "Phân tích & Đánh giá", active: false },
  { icon: BarChart3, label: "Báo cáo & Phân tích", active: false },
  { icon: Settings, label: "Cài đặt", active: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3 text-left transition-colors",
              item.active 
                ? "bg-blue-50 text-[#0B5FA5] border-l-4 border-[#0B5FA5]" 
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
