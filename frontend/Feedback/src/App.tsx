import { useState } from "react";
import { Header } from "./components/Header";
import { FeedbackSubmission } from "./components/FeedbackSubmission";
import { SuccessModal } from "./components/SuccessModal";
import { FeedbackHistory } from "./components/FeedbackHistory";
import { TutorDashboard } from "./components/TutorDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { FileText, History, BarChart3 } from "lucide-react";

export default function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedRatings, setSubmittedRatings] = useState({
    overall: 0,
    knowledge: 0,
    clarity: 0,
    helpfulness: 0,
    timeManagement: 0,
  });

  const handleFeedbackSubmit = (feedback: any) => {
    if (!feedback.isDraft) {
      setSubmittedRatings(feedback.ratings);
      setShowSuccessModal(true);
    } else {
      // Handle draft save
      console.log("Draft saved:", feedback);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 bg-white shadow-sm">
            <TabsTrigger
              value="submit"
              className="data-[state=active]:bg-[#003DA5] data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Gửi đánh giá
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#003DA5] data-[state=active]:text-white"
            >
              <History className="w-4 h-4 mr-2" />
              Lịch sử
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-[#003DA5] data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard Tutor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="max-w-4xl mx-auto">
            <FeedbackSubmission onSubmit={handleFeedbackSubmit} />
          </TabsContent>

          <TabsContent value="history" className="max-w-4xl mx-auto">
            <FeedbackHistory />
          </TabsContent>

          <TabsContent value="dashboard" className="max-w-6xl mx-auto">
            <TutorDashboard />
          </TabsContent>
        </Tabs>
      </main>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        ratings={submittedRatings}
      />

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 HCMUT Tutor Support System - Hệ thống hỗ trợ gia sư
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#003DA5]">
                Hỗ trợ
              </a>
              <a href="#" className="text-gray-600 hover:text-[#003DA5]">
                Điều khoản
              </a>
              <a href="#" className="text-gray-600 hover:text-[#003DA5]">
                Bảo mật
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
