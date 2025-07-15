
const Dashboard = () => {
  return (
    <>
    <main className="w-full flex bg-[#EEEEEE] min-h-[100vh]">
      <div className="leftside w-[20%]  bg-white py-3 ">
        <h1 className="text-[30px] font-bold px-3">Nyandesk</h1>
        <div className="left-tabs h-[75%] overflow-y-auto flex flex-col items-start mt-10  gap-2">
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">DashBoard</button>
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">ATS Checker</button>
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">Jobs</button>
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">Interview Prepration</button>
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">Suggestions</button>

        </div>
        <div className="left-tabs  flex flex-col items-start   gap-2">
                    <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">Profile</button>
          <button className="cursor-pointer py-[6px] bg-[#eeeeee] w-full text-left pl-5">Settings</button>
        </div>
      </div>
        <div className="dashboardTop bg-white flex items-center justify-end px-10 w-[80%] h-[50px]
">
          <img className="w-[25px] h-[25px] rounded-full mr-3 bg-red-400" src="" alt="" />
          <p className="text-[13px]">Hey Pranit...👋😊</p>
        </div>
    </main>
    </>
  )
}

export default Dashboard