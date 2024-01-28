'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  onsubmit = () => {};
  return <></>;
}

export default ListingReservation;
