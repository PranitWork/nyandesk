import { useState } from "react";
import Atschecker from "../../components/dashboardComp/Atschecker";
import Header from "../../components/dashboardComp/Header";
import LeftSidePannel from "../../components/dashboardComp/LeftSidePannel";
import JobsInfo from "../../components/dashboardComp/JobsInfo";
import UserProfile from "../../components/dashboardComp/UserProfile";
import Logout from "../../components/dashboardComp/Logout";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const renderComponents = () => {
    switch (activeItem) {
      case "ATS Checker":
        return <Atschecker />;
      case "Jobs":
        return <JobsInfo />;
      case "Profile":
        return <UserProfile />;
      case "Logout":
        return <Logout/>;
      default:
        return <JobsInfo />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <LeftSidePannel activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex-1 overflow-y-auto">{renderComponents()}</div>
      </div>
    </main>
  );
};

export default Dashboard;
