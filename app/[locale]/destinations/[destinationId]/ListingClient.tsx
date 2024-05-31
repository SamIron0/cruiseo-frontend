"use client"

import { useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Date, Destination, Trip } from "@/types"
import Container from "@/components/Container"
import ListingHead from "@/components/listings/ListingHead"
import { useContext } from "react"
import { toast } from "sonner"
import { CruiseoContext } from "@/context/context"
import { CarpoolForm } from "@/components/ui/carpool-form"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Trips } from "@/components/ui/trips"
import { Checkout } from "@/components/checkout"
import { Tables } from "@/supabase/types"
import axios from "axios"
import { calculatePrice } from "@/utils/helpers"
interface ListingClientProps {
  listing: Destination
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  const [origin, setOrigin] = useState<string>("")
  const [dateTime, setDateTime] = useState({
    date: "",
    hour: "",
    ampm: "",
    minute: ""
  })
  const { profile, selectedTrip, setSelectedTrip } = useContext(CruiseoContext)
  const [isLoading, setIsLoading] = useState(false)
  const [priceIsLoading, setPriceIsLoading] = useState(false)
  const [loadedPrices, setLoadedPrices] = useState(new Map<string, number>())
  const [availableTrips, setAvailableTrips] = useState<Tables<"usertrips">[]>([
    {
      id: uuidv4(),
      price: 25,
      pickup: {
        date: dateTime.date,
        hour: dateTime.hour,
        ampm: dateTime.ampm,
        minute: dateTime.minute
      },
      uid: profile?.id || "",
      tripid: "",
      origin: origin,
      destination: listing.id
    }
  ])
  useEffect(() => {
    setStep(0)
    setAvailableTrips([
      {
        id: uuidv4(),
        price: 25,
        pickup: {
          date: dateTime.date,
          hour: dateTime.hour,
          ampm: dateTime.ampm,
          minute: dateTime.minute
        },
        origin: origin,
        destination: listing.address,
        uid: profile?.id || "",
        tripid: ""
      }
    ])
  }, [dateTime.date, origin])
  const [distance, setDistance] = useState(null)
  const onSearchClick = () => {
    getTrips()
    setSelectedTrip(availableTrips[0])
    calculatePrice()
  }
  

  const getTrips = async () => {
    try {
      const trips = await fetch("/api/getAvailableTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destination: listing?.address,
          dateTime: dateTime
        })
      }).then(res => res.json())

      trips ? setAvailableTrips(availableTrips.concat(trips)) : null
    } catch {
      console.error("An error occurred while fetching trips")
    }
  }
  const [step, setStep] = useState(0)
  return (
    <Container>
      <div
        className="
          max-w-3xl 
          mx-auto
          pt-6
        "
      >
        <div className="flex flex-col pb-12  gap-6">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="w-32 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-all duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-zinc-800 dark:bg-background dark:text-zinc-200 dark:border-input hover:scale-105 active:scale-90"
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
          <CarpoolForm
            origin={origin}
            dateTime={dateTime}
            onSetOrigin={setOrigin}
            onSetDateTime={setDateTime}
          />

          <Drawer>
            <DrawerTrigger
              disabled={origin == "" || dateTime.date == ""}
              onClick={() => onSearchClick()}
              className=" rounded-lg py-2 px-8 bg-blue-500 text-md max-w-xl"
            >
              Search
            </DrawerTrigger>
            <DrawerContent>
              {step == 0 ? (
                <div className="max-w-3xl w-full mx-auto flex flex-col">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div>
                        <h1 className="text-2xl font-bold w-full">Results</h1>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>
                  <Trips
                    selectedTrip={selectedTrip}
                    onSelectTrip={setSelectedTrip}
                    trips={availableTrips}
                  />
                  <DrawerFooter>
                    <Button onClick={() => setStep(2)}>Book</Button>
                    <DrawerClose>
                      <Button
                        onClick={() => setStep(0)}
                        className="w-full "
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              ) : (
                <div className="max-w-3xl w-full mx-auto flex flex-col ">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div>
                        <h1 className="text-2xl font-bold w-full">Checkout</h1>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>

                  <Checkout
                    selectedTrip={selectedTrip}
                    onBackClick={() => setStep(0)}
                  />
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
