
const Loader = () => {
  return (
    <div className="border rounded-xl shadow-md p-4 animate-pulse bg-white">
      {/* Title placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Subtitle placeholder */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>

      {/* Description placeholder */}
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

      {/* Buttons placeholder */}
      <div className="flex gap-3 mt-4">
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}

export default Loader