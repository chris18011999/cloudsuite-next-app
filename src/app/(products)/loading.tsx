export default async function Loading() {
  return (
    <div className="flex gap-3">
      <div className="w-1/3"></div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => {
          return <div key={index} className="w-full h-96 rounded-sm bg-gray-200" />;
        })}
      </div>
    </div>
  );
}
