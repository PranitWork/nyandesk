import Footer from "../../components/landingComp/Footer";
import Navigation from "../../components/landingComp/Navigation";
import Pricing from "../../components/landingComp/Pricing";

const Landing = () => {
  return (
    <main className="w-full relative">
      <Navigation />

     <section className="w-[98%] m-auto mt-3 rounded-[10px] min-h-screen bg-[url('../../../public/Images/herosection/background.png')] bg-cover bg-center flex flex-col items-center justify-start px-4 md:px-0">
  <h1 className="text-[28px] md:text-[40px] w-full md:w-1/2 text-center font-bold leading-tight md:leading-[3rem] mt-20 md:mt-30">
    AI That Transforms Your Career Journey
  </h1>

  <p className="w-full md:w-3/5 text-center text-gray-500 mt-3 text-[14px] md:text-[16px] px-2">
    From resume building to interview prep and personalized career
    roadmaps — unlock smarter career growth with AI-powered insights.
  </p>

  <div className="btns flex mt-5 md:flex-row items-center">
    <button className="py-2 px-5 bg-black text-white font-bold mx-2 my-2 rounded-[10px] text-[13px]">
      Free Trial
    </button>
    <button className="py-2 px-5 bg-black text-white font-bold mx-2 my-2 rounded-[10px] text-[13px]">
      See Plans
    </button>
  </div>

  <div className="overlays w-full md:w-[80%] rounded-t-[20px] overflow-hidden pt-5 border-white border-4 bg-[#f5f5f56e] flex justify-center mt-5">
    <img
      className="w-[95%] rounded-[20px] object-cover"
      src="../../../public/Images/herosection/dashboard.png"
      alt=""
    />
  </div>
</section>

      <Pricing/>
      <Footer/>
    </main>
  );
};

export default Landing;
