'use client';

import { useState } from 'react';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

interface ListingReservationProps {
  onChangeDate: (value: string) => void;
  onSubmit?: () => void;
}

const ListingReservation = ({
  onChangeDate,
  onSubmit
}: ListingReservationProps) => {
  const onChange = (value: string) => {
    onChangeDate(value);
    console.log('dateinlr',value);
  };
  return (
    <div>
      <DateTimePicker
        onChange={(date: string, hour: number, minute: number, ampm: string) =>
          onChange(`${date} ${hour}:${minute} ${ampm}`)
        }
      />
    </div>
  );
};

export default ListingReservation;
