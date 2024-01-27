'use client';

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { DateRangePicker, Range } from 'react-date-range';
import { v4 as uuidv4 } from 'uuid';
import { Destination, Trip, UserDetails } from '@/types';
import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import { useListings } from '@/app/providers/ListingProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button, Page, Table, Text } from '@geist-ui/core';
interface ListingClientProps {
  listing: Destination;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const { userDetails } = useListings();
  const [isLoading, setIsLoading] = useState(false);
  const [priceIsLoading, setPriceIsLoading] = useState(false);
  const [loadedPrices, setLoadedPrices] = useState(new Map<string, number>());

  const getPrice = async (trip: Trip) => {
    setIsLoading(true);
    setPriceIsLoading(true);
    const toastId = toast.loading('Calculating price...');

    const workerID = 1;
    const destinationraw = {
      address: listing.address,
      latitude: listing?.coordinates?.lat,
      longitude: listing?.coordinates?.lon
    };

    try {
      const response = await fetch(
        'https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            originraw: userDetails?.geolocation,
            destinationraw: destinationraw,
            worker: workerID,
            userID: userDetails?.id
          })
        }
      );
      const result = await response.json();

      if (response.ok) {
        const responseBody = JSON.parse(result.body);
        if (responseBody.result && responseBody.result.startsWith('C')) {
          const discount = 0.1;
          const fullPrice = parseFloat(
            responseBody.result.replace(/[^0-9.]/g, '')
          );
          const discountedPrice = parseFloat(
            (fullPrice * (1 - discount)).toFixed(2)
          );
          const updatedPrices = new Map(loadedPrices);
          updatedPrices.set(trip.id, discountedPrice);
          setLoadedPrices(updatedPrices);
          setIsLoading(false);
          setPriceIsLoading(false);
          toast.dismiss(toastId);
          toast.success('Done');
        } else {
          console.error('Error invoking Lambda function');
        }
      }
    } catch (error) {
      toast.dismiss(toastId);
      setIsLoading(false);
      toast.error('An error occurred while calculating price');
    }
  };
  const [selectedTrip, setSelectedTrip] = useState<Trip>({
    id: '',
    origin: '',
    destination_id: '',
    user_ids: [],
    date: 'new Date()',
    price: 0,
    status: ''
  });
  const onCreateReservation = async () => {
    setIsLoading(true);
    if (!selectedTrip.id) {
      toast.error('Please select a trip');
      return;
    }
    // if (!userDetails) {
    // router.push('/login');
    //}
    if (!loadedPrices.get(selectedTrip.id)) {
      await getPrice(selectedTrip);
    }
    if (!loadedPrices.get(selectedTrip.id)) {
      return;
    }
    const newTrip: Trip = {
      id: uuidv4(),
      origin: userDetails?.address || '',
      destination_id: listing.id,
      user_ids: [userDetails?.id || ''],
      date: selectedTrip.date,
      price: loadedPrices.get(selectedTrip.id) || 0,
      status: 'Active'
    };
    try {
      const url = '/api/createTrip';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrip)
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('data', data);
      if (data.error) {
        toast.error('An error occurred while creating the trip');
      } else {
        toast.success('Trip created successfully');
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  const [selectedDate, setSelectedDate] = useState();

  const dataSource = [
    { property: 'type', description: 'Content type', operation: '' },
    { property: 'Component', description: 'DOM element to use', operation: '' },
    { property: <Text b>bold</Text>, description: 'Bold style', operation: '' }
  ];
  const [data, setData] = useState(dataSource);
  const renderAction = (value: any, rowData: any, rowIndex: number) => {
    const updateHandler = () => {
      setData((last) => {
        return last.map((item, dataIndex) => {
          if (dataIndex !== rowIndex) return item;
          return {
            ...item,
            property: Math.random().toString(16).slice(-5)
          };
        });
      });
    };
    return (
      <Button
        type="secondary"
        auto
        scale={1 / 3}
        font="12px"
        onClick={updateHandler}
      >
        Update
      </Button>
    );
  };
  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          pt-6
        "
      >
        <div className="flex flex-col pb-12  gap-6">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="w-32 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-all duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 hover:scale-105 active:scale-90"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>

          <ListingHead
            title={listing?.name}
            imageSrc={listing?.photo}
            locationValue={listing?.address}
            id={listing?.id}
          />
          <div className="sm:flex sm:flex-1 gap-4 ">
            <div className="w-full sm:pr-6 ">
              {listing.activeTrips?.map((trip: any) => (
                <div className="w-full pb-3">
                  {/* Content */}
                  <div
                    className="max-w-xl md:max-w-none md:w-full sm:mx-auto md:col-span-7 lg:col-span-6 "
                    data-aos="fade-right"
                  >
                    {/* Tabs buttons */}
                    <div className=" text-white">
                      <div
                        className={`flex justify-between bg-zinc-800  w-full items-center text-lg p-3 rounded-lg  transition duration-300 ease-in-out hover:shadow-lg ${
                          selectedTrip.id === trip.id
                            ? `shadow-lg border-blue-500 border first-letter:hover:shadow-lg`
                            : `  shadow-md border border-zinc-600 `
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="font-normal text-sm text-zinc-300 leading-snug tracking-tight mb-1">
                            Price:{' '}
                            <span className="text-white font-semibold">
                              {loadedPrices?.get(trip.id)}
                            </span>
                          </div>

                          <div className="font-normal text-sm text-zinc-300 text-smleading-snug tracking-tight mb-1">
                            Time:{' '}
                            <span className="text-white font-semibold">
                              {trip.date}
                            </span>
                          </div>
                          <div className="font-normal text-sm text-zinc-300 leading-snug tracking-tight mb-1">
                            Riders:{' '}
                            <span className="text-white font-semibold">
                              {trip.user_ids.length}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                          <button
                            onClick={() => getPrice(trip)}
                            disabled={
                              isLoading ||
                              loadedPrices?.get(trip.id) !== undefined
                            }
                            className="flex text-sm pb-2 justify-center items-center px-4 py-2 bg-zinc-100 text-black rounded-lg shadow flex-shrink-0 ml-3 active:bg-zinc-300 transition duration-150 transform active:scale-110"
                          >
                            Show Price
                          </button>

                          <button
                            disabled={isLoading || trip.id == selectedTrip.id}
                            onClick={() => setSelectedTrip(trip)}
                            className="flex text-sm justify-center items-center px-4 py-2 bg-fuchsia-600 text-white rounded-lg shadow flex-shrink-0 ml-3 active:bg-fuchsia-800 transition duration-150 transform active:scale-110"
                          >
                            Select
                          </button>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {window.innerWidth > 640 && (
              <div className="h-[450px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-10"></div>
            )}{' '}
            <div className="w-full sm:pl-6 flex items-center justify-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{
                    color: 'white'
                  }}
                />{' '}
              </LocalizationProvider>
            </div>
          </div>

          <button
            className=" rounded-lg py-2 px-8 bg-blue-500 text-md"
            onClick={() => onCreateReservation()}
            disabled={isLoading}
          >
            Reserve
          </button>
        </div>

        <div className="relative max-w-2xl mx-auto mt-8 shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-300">
            <thead className="text-xs text-zinc-400 uppercase bg-[#232325]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Riders
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="  border-b border-zinc-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  3:13
                </th>
                <td className="px-6 py-4">$42</td>
                <td className="px-6 py-4">1</td>
              </tr>
              <tr className=" border-b bg-zinc-700 border-zinc-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  2:13
                </th>
                <td className="px-6 py-4">$36</td>
                <td className="px-6 py-4">2</td>
              </tr>
              <tr className="border-b  border-zinc-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  2:13
                </th>
                <td className="px-6 py-4">$36</td>
                <td className="px-6 py-4">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
