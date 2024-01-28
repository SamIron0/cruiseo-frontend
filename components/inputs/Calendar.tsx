'use client';

import { useState } from 'react';
import {
  DateRange,
  DateRangePicker,
  Range,
  RangeKeyDict
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, disabledDates }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  return (
    <DateRangePicker
      minDate={new Date()}
      rangeColors={['#232325']}
      ranges={state}
      onChange={onChange}
      moveRangeOnFirstSelection={false}
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
