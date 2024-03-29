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
import { TbCar, TbShoppingCart } from 'react-icons/tb';
import CategoryBox from '@/components/CategoryBox';
import ListingReservation from '@/components/listings/ListingReservation';
import { Table } from '@/components/ui/table';
import { TripsTable } from '@/components/Table';
import { Button } from '@/components/ui/button';
interface ListingClientProps {
  listing: Destination;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const { userDetails } = useListings();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState<Trip>({
    id: '',
    origin: '',
    destination_id: '',
    user_ids: [],
    date: 'new Date()',
    price: 0,
    status: ''
  });

  const [priceIsLoading, setPriceIsLoading] = useState(false);

  const [loadedPrices, setLoadedPrices] = useState<Map<string, number>>(
    new Map()
  );
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

  const categories = [
    {
      label: 'Existing',
      icon: TbCar,
      description: 'View All Available Destinations!'
    },
    {
      label: 'New Trip',
      icon: TbShoppingCart,
      description: 'This property is has windmills!'
    }
  ];

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    return dates;
  }, []);

  const [date, setDate] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState(categories[0].label);
  console.log('date', date);
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
          <Button
             
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
          </Button>

          <ListingHead
            title={listing?.name}
            imageSrc={listing?.photo}
            locationValue={listing?.address}
            id={listing?.id}
          />
          <Container>
            <div
              className="
        pt-4 flex px-10 sm:px-24 md:px-44 lg:px-64 xl:px-80 flex-row items-center justify-between overflow-x-auto"
            >
              {categories.map((item, index) => (
                <CategoryBox
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={activeCategory === item.label}
                  onCategoryClick={() => setActiveCategory(item.label)}
                />
              ))}
            </div>
          </Container>
          {activeCategory === 'Existing' ? (
            <TripsTable
              listing={listing}
              selectedTrip={selectedTrip}
              setSelectedTrip={setSelectedTrip}
              getPrice={getPrice}
              priceIsLoading={isLoading}
              loadedPrices={loadedPrices}
            />
          ) : (
            <div className="flex items-center justify-center">
              <ListingReservation onChangeDate={(value) => setDate(value)} />
            </div>
          )}

          <span className="w-full pt-6  flex justify-center">
            <button
              className=" rounded-lg py-2 px-32 bg-blue-500 text-md"
              onClick={() => onCreateReservation()}
              disabled={isLoading}
            >
              Reserve
            </button>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
