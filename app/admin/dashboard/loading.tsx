export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-800 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-800 rounded animate-pulse" />
        ))}
      </div>
      <div className="h-96 bg-gray-800 rounded animate-pulse" />
    </div>
  )
}
