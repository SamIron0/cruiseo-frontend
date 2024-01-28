'use client';
import { Destination, Trip } from '@/types';
import { useState } from 'react';

interface TableProps {
  listing: Destination;
  selectedTrip: Trip;
  setSelectedTrip: (trip: Trip) => void;
  getPrice: (trip: Trip) => void;
  priceIsLoading: boolean;
  loadedPrices: Map<string, number>;
}
const Table = ({
  listing,
  selectedTrip,
  setSelectedTrip,
  getPrice,
  priceIsLoading,
  loadedPrices
}: TableProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const renderTripRows = listing.activeTrips?.map((trip: Trip, i: number) => (
    <tr
      onClick={() => {
        setSelectedTrip(trip);
      }}
      className={`
    ${`border-b border-zinc-700 ${i % 2 && 'bg-zinc-800'}`}`}
    >
      <td className=" pl-8 py-4 ">
        {selectedTrip.id === trip.id ? (
          <input className="w-4 h-4 rounded-full border border-blue-500 bg-blue-500 p-1 " />
        ) : (
          <input className="w-4 h-4 rounded-full bg-gray-100 border-gray-300" />
        )}
      </td>
      <th scope="row" className="pl-10 py-4 font-medium whitespace-nowrap">
        {trip.date}
      </th>
      <td className="pl-10 py-4">
        {loadedPrices?.get(trip.id) ? (
          loadedPrices.get(trip.id)
        ) : (
          <button
            onClick={() => getPrice(trip)}
            disabled={priceIsLoading}
            className="text-sm px-2 py-1 bg-zinc-100 text-black rounded-lg shadow active:bg-zinc-300 transition duration-150 transform active:scale-110"
          >
            show
          </button>
        )}
      </td>
      <td className="pl-10 py-4 text-zinc-400">{trip.user_ids?.length}</td>
    </tr>
  ));

  return (
    <div className="sm:flex sm:flex-1 gap-4 ">
      <div className="w-full sm:pr-6 ">
        <div className="relative max-w-2xl mx-auto mt-8 shadow-md overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-300">
            <thead className="text-xs text-white uppercase bg-zinc-900">
              <tr className="">
                <th scope="col" className="pl-2 py-3"></th>{' '}
                <th scope="col" className="pl-10 py-3">
                  Time
                </th>
                <th scope="col" className="pl-10 py-3">
                  Price
                </th>
                <th scope="col" className="pl-10 py-3">
                  Riders
                </th>
              </tr>
            </thead>
            <tbody>{renderTripRows}</tbody>
          </table>
        </div>{' '}
      </div>
    </div>
  );
};
export default Table;
