import React from 'react'

const Pricing = () => {
  return (
    <section className="w-full min-h-screen text-center py-3">
  <h3 className="pt-[30px] text-[25px] font-bold">Pricing</h3>

  <div className="w-full px-3 mt-7 h-full flex flex-col md:flex-row items-center justify-evenly gap-5 md:gap-0">
    <div className="w-full md:w-1/4 h-[70vh] rounded-[20px] bg-gray-300"></div>
    <div className="w-full md:w-1/4 h-[90vh] rounded-[20px] bg-gray-300"></div>
    <div className="w-full md:w-1/4 h-[70vh] rounded-[20px] bg-gray-300"></div>
  </div>
</section>

  )
}

export default Pricing