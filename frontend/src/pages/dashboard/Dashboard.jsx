import { useState } from "react";
import Atschecker from "../../components/dashboardComp/Atschecker"
import Header from "../../components/dashboardComp/Header"
import LeftSidePannel from "../../components/dashboardComp/leftSidePannel"
import JobsInfo from "../../components/dashboardComp/JobsInfo";


const Dashboard = () => {
  const [activeItem, setactiveItem] = useState("Dashboard");
  const renderComponents= ()=>{
    switch(activeItem){
      case "ATS Checker":
        return <Atschecker/>;
      case "Dashboard":
        return "dashboard";
      case "Jobs":
        return <JobsInfo/>;
      case "Chat With AI":
        return "chat with ai";
      case "Profile":
        return "profile";
      case "Logout":
        return "logout";
      default:
        return "dashboard";
    }
  }
  return (
    <>
    <main >
      <Header/>
      <div className="w-full flex items-center justify-start">
        <LeftSidePannel activeItem={activeItem} setActiveItem={setactiveItem}/>
        {renderComponents()}
      </div>
    </main>
    </> 
  )
}

export default Dashboard