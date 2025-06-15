"use client";

export default function Travel() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden
bg-[url(/assets/images/mapbackground.jpg)]
                  bg-cover bg-center bg-no-repeat" // แก้ไข path ตรงนี้
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-center p-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            ผู้ใช้สามารถรายงานพฤติกรรมวินมอเตอร์ไซค์ที่ไม่เหมาะสมได้ที่นี่
          </h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg
                       transition duration-200 ease-in-out transform hover:scale-105"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSer6CCvQCxkn6RGxE1FjDGrdLE2GcfChhlgUufl92b8udl5Cg/viewform",
                "_blank",
              )
            }
          >
            รายงาน
          </button>
        </div>
      </div>
    </div>
  );
}
