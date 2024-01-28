'use client';

import Image from 'next/image';

import Heading from '../Heading';
import HeartButton from '../HeartButton';
import { User } from '@supabase/supabase-js';
interface ListingHeadProps {
  title: string | undefined;
  imageSrc: string | undefined;
  id: string | undefined;
  locationValue: string | undefined;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
  locationValue
}) => {
  return (
    <>
      <Heading title={title ? title : 'title'} subtitle={locationValue} />
      <div
        className="
          w-full
          h-[45vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc || ''}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id as string} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
