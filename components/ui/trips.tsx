import { Trip } from "@/types"

interface TripsProps {
  trips: Trip[]
}
export const Trips = ({ trips }: TripsProps) => {
  return (
    <div className="p-4">
      {trips.map(trip => (
        <div className="flex text-sm flex-row items-center border border-input mb-2 p-4 rounded">
          <div key={trip.id} className="flex flex-col justify-between">
            <span>{trip.date}</span>
            <span className="font-semibold">2 seats</span>
            <span>${trip.price}</span>
          </div>
          <span className="flex flex-col text-sm ">{trip.origin}</span>
          <span className="flex flex-col text-sm">{trip.origin}</span>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-2.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-3.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border-2  rounded-full border-gray-800"
              src="/docs/images/people/profile-picture-4.jpg"
              alt=""
            />
          </div>{" "}
        </div>
      ))}
    </div>
  )
}