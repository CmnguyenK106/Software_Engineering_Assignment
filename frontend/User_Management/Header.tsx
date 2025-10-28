import { User, Settings, HelpCircle, Shield, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HCMUTLogo } from "./HCMUTLogo";

export function Header() {
  const userRole = "Member"; // Có thể thay đổi thành "Admin" hoặc "Tutor" để test
  const isAdminOrTutor = userRole === "Admin" || userRole === "Tutor";

  return (
    <header className="h-16 bg-[#0B5FA5] text-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1.5 rounded">
          <HCMUTLogo className="w-9 h-9" />
        </div>
        <span className="font-medium">HCMUT Tutor Support System</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Mai Xuân Phúc 2312487</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B5FA5] hover:opacity-90 transition-opacity cursor-pointer">
              <span className="font-medium">MP</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Hồ sơ của tôi</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Cài đặt</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Trợ giúp & Hỗ trợ</span>
            </DropdownMenuItem>
            {isAdminOrTutor && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#0B5FA5]">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Chế độ Admin</span>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
