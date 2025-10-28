import logoHCMUT from "figma:asset/9dcf39f2e0f51f60852bbdd0fa8837b632cac86d.png";

export function HCMUTLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src={logoHCMUT}
      alt="Logo Đại học Bách Khoa TP.HCM"
      className={className}
    />
  );
}
