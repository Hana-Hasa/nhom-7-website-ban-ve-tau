
import React from 'react';

interface TrainInfoProps {
  trainId: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

const TrainInfo: React.FC<TrainInfoProps> = ({
  trainId,
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
  duration,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[#003366]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#003366] text-white p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#003366]">{trainId}</h2>
            <p className="text-gray-500 text-sm">Tàu khách thống nhất</p>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto px-4">
          <div className="flex justify-between items-center text-sm font-semibold mb-1 text-gray-700">
            <span>{departureStation}</span>
            <span className="text-[#CC0000]">{duration}</span>
            <span>{arrivalStation}</span>
          </div>
          <div className="relative flex items-center">
            <div className="h-1 w-full bg-gray-200 rounded"></div>
            <div className="absolute left-0 h-3 w-3 bg-[#003366] rounded-full"></div>
            <div className="absolute right-0 h-3 w-3 bg-[#003366] rounded-full"></div>
             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
                &rarr;
             </div>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
             <span>{departureTime}</span>
             <span>{arrivalTime}</span>
          </div>
        </div>

        <div className="text-right hidden md:block">
           <span className="block text-xs text-gray-500">Ngày đi</span>
           <span className="font-bold text-[#003366]">15/12/2025</span>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
