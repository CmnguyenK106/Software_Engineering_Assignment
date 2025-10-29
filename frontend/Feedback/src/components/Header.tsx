import hcmutLogo from "figma:asset/c5b3a5b2ef67f8273f01c5a97b5ce1561c43a92f.png";

export function Header() {
  return (
    <header className="bg-[#E6F0FF] border-b border-[#BFD3FF] shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={hcmutLogo} alt="HCMUT Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-[#003DA5] font-semibold">HCMUT Tutor Support System</h1>
            <p className="text-sm text-[#334155]">Hệ thống Cố vấn Học thuật</p>
          </div>
        </div>
        <nav className="flex gap-6">
          <a href="#" className="text-[#1f2a44] hover:text-[#003DA5] transition-colors">Trang chủ</a>
          <a href="#" className="text-[#1f2a44] hover:text-[#003DA5] transition-colors">Buổi học</a>
          <a href="#" className="text-[#1f2a44] hover:text-[#003DA5] transition-colors">Đánh giá</a>
        </nav>
      </div>
    </header>
  );
}
