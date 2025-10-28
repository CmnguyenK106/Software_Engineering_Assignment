import { useState } from "react";
import { TutorClassSetup } from "./components/TutorClassSetup";
import { TuteeClassSearch } from "./components/TuteeClassSearch";
import { ClassDetail } from "./components/ClassDetail";
import { TutorMatching } from "./components/TutorMatching";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { GraduationCap, CalendarDays, Search, UsersRound } from "lucide-react";

type View = "tutor-setup" | "tutee-search" | "class-detail" | "tutor-matching";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("tutee-search");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    setCurrentView("class-detail");
  };

  const handleBackFromDetail = () => {
    setCurrentView("tutee-search");
    setSelectedClassId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1>TutorConnect</h1>
            </div>
            <div className="flex gap-2">
              <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as View)}>
                <TabsList>
                  <TabsTrigger value="tutor-setup" className="gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Tutor Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="tutee-search" className="gap-2">
                    <Search className="w-4 h-4" />
                    Find Classes
                  </TabsTrigger>
                  <TabsTrigger value="tutor-matching" className="gap-2">
                    <UsersRound className="w-4 h-4" />
                    Find Tutors
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentView === "tutor-setup" && <TutorClassSetup />}
        {currentView === "tutee-search" && <TuteeClassSearch onSelectClass={handleSelectClass} />}
        {currentView === "class-detail" && selectedClassId && (
          <ClassDetail classId={selectedClassId} onBack={handleBackFromDetail} />
        )}
        {currentView === "tutor-matching" && <TutorMatching />}
      </main>
    </div>
  );
}
