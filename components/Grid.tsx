'use client';
import Container from './Container';
import ListingCard from './listings/ListingCard';
import EmptyState from './EmptyState';
import Navbar from './navbar/NavBar';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import ClientOnly from './ClientOnly';
import { Destination } from '@/types';
import { useEffect, useState } from 'react';
import { all } from 'axios';
import { useListings } from '@/app/providers/ListingProvider';
import { User } from '@supabase/supabase-js';

import { Skeleton } from '@/components/ui/skeleton';

interface GridProps {
  searchParams: IListingsParams;
  userDetails: any;
  user: User | undefined;
}

export function Grid({ searchParams, user, userDetails }: GridProps) {
  const { allListings, setAllListings, activeCategory, setUserDetails } =
    useListings();
  const location = {
    lat: 37.7749,
    lon: -122.4194
  };
  userDetails.geolocation = location;
  setUserDetails(userDetails);
  const fetchLocation = async () => {
    // for now use madeup address
    const location = {
      lat: 37.7749,
      lon: -122.4194
    };
    //setRegion(location);

    // this should retrun users address.
    return location;

    //use this to get general user location
    try {
      const res = await fetch('api/getLocation');
      if (res.status === 200) {
        // valid response
        const data = await res.json();
      } else {
        console.error('An error occurred while fetching the location');
      }
    } catch (error) {
      console.error('An error occurred while fetching the location:', error);
    }
  };
  // get al destinations from supabase and then prices
  useEffect(() => {
    const getListing = async () => {
      const userGeo = await fetchLocation();
      const data = await getListings(searchParams, userGeo);
      setAllListings(data);
    };
    getListing();
  }, []);

  // get the price of all destinatiions and store it in the state

  const destination = null;
  const currentUser = null;

  // display empty state if no destinations to displaay
  if (allListings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  const renderCards = () => {
    const category: any = activeCategory;
    // remove -----------

    return (
      <div>
        {/* @ts-expect-error */}
        <Navbar user={user} />
        {allListings ? (
          <div
            className="
              pt-[198px]
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-7
              pb-48
            "
          >
            {category === 'All'
              ? allListings.map((listing: any) => (
                  <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                  />
                ))
              : allListings
                  .filter((listing: any) => listing.category === category)
                  .map((listing: any) => (
                    <ListingCard
                      currentUser={currentUser}
                      key={listing.id}
                      data={listing}
                    />
                  ))}
          </div>
        ) : (
          <div
            className="
            pt-[198px]
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-7
            pb-12
          "
          >
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <ClientOnly>
      <Container>{renderCards()}</Container>
    </ClientOnly>
  );
}
