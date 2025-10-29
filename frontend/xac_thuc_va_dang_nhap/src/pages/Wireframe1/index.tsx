import React from "react";

export default function Wireframe1() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<div className="flex items-center gap-8 px-4 py-4">
				<img
					src="/src/assets/logo.png"
					className="w-24 h-24 object-contain"
					alt="HCMUT logo"
				/>
				<span className="text-black text-2xl md:text-3xl font-semibold" >
					{"TRƯỜNG ĐẠI HỌC BÁCH KHOA TP. HỒ CHÍ MINH (HCMUT)"}
				</span>
			</div>

			<div className="flex-1 flex justify-center items-start w-full bg-[#005BAC] py-8 md:py-12">
				<div className="flex flex-col items-center bg-white p-6 md:p-8 rounded-lg shadow-lg w-[95%] max-w-[400px]">
					<h1 className="text-[#005BAC] text-xl md:text-2xl font-bold mb-6 text-center">
						{"Đăng nhập sinh viên HCMUT"}
					</h1>
					<div className="w-full space-y-4">
						<div className="space-y-1.5">
							<label className="text-black text-base font-bold block">
								{"Tên đăng nhập"}
							</label>
							<input 
								type="text"
								id="username"
								data-testid="username-input"
								name="username"
								className="w-full h-10 px-3 bg-[#FFF4D1E3] rounded-lg border border-[#161616] focus:outline-none focus:border-[#005BAC]"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-black text-base font-bold block">
								{"Mật khẩu đăng nhập"}
							</label>
							<input 
								type="password"
								id="password"
								data-testid="password-input"
								name="password"
								className="w-full h-10 px-3 bg-[#FFF4D1E3] rounded-lg border border-[#161616] focus:outline-none focus:border-[#005BAC]"
							/>
						</div>
						<button 
							id="login-button"
							data-testid="login-button"
							className="w-full bg-[#005BACE3] text-white text-base font-bold py-2.5 px-4 rounded-lg border border-[#161616] hover:bg-[#004a8a] transition-colors"
							onClick={()=>alert("Pressed!")}>
							{"Đăng nhập"}
						</button>
						<div className="text-center">
							<a href="#" id="forgot-password" data-testid="forgot-password" className="text-sm font-bold text-black hover:text-[#005BAC]">
								{"Quên mật khẩu?"}
							</a>
						</div>
						<div className="flex items-center justify-center gap-2 text-lg">
							<span className="text-black">
								{"Chưa có tài khoản?"}
							</span>
							<a href="#" id="signup-link" data-testid="signup-link" className="font-bold text-black hover:text-[#005BAC]">
								{"Đăng ký?"}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}