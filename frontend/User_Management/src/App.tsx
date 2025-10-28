import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserManagement } from "./components/UserManagement";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <UserManagement />
      </div>
    </div>
  );
}
