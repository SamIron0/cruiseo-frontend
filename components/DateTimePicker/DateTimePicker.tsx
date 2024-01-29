import { useState } from 'react';
import dayjs from 'dayjs';
import './styles.css';

import { WheelPicker } from '../wheel-picker/WheelPicker';

const hourItems = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: index + 1
}));
const minuteItems = Array.from({ length: 4 }, (_, index) => ({
  value: `${(index * 15).toString().padStart(2, '0')}`,
  label: `${(index * 15).toString().padStart(2, '0')}`
}));

const ampmItems = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' }
];

const currentDaysInMonth = dayjs().daysInMonth();
const dateItems = Array.from({ length: currentDaysInMonth * 2 }, (_, i) => {
  const date = dayjs().add(-currentDaysInMonth, 'days').add(i, 'days');
  return {
    value: date.startOf('day').format('YYYY-MM-DD'),
    label: currentDaysInMonth === i ? 'Today' : date.format('ddd DD MMM')
  };
});

export default function DateTimePicker({ onChange }: any) {
  const [date, setDate] = useState(dateItems[currentDaysInMonth].value);
  const [hour, setHour] = useState(hourItems[5].value);
  const [minute, setMinute] = useState(minuteItems[2].value);
  const [ampm, setAmpm] = useState(ampmItems[0].value);

  const handleDateChange = (value: string) => {
    setDate(value);
    onChange(value, hour, minute, ampm);
  };
  const handleHourChange = (value: number) => {
    setHour(value);
    onChange(date, value, minute, ampm);
  };
  const handleMinuteChange = (value: string) => {
    setMinute(value);
    onChange(date, hour, value, ampm);
  };
  const handleAmpmChange = (value: string) => {
    setAmpm(value);
    onChange(date, hour, minute, value);
  };

  return (
    <div>
      <WheelPicker
        dateItems={dateItems}
        dateValue={date}
        onDateChange={handleDateChange}
        hourItems={hourItems}
        hourValue={hour}
        onHourChange={handleHourChange}
        minuteItems={minuteItems}
        minuteValue={minute}
        onMinuteChange={handleMinuteChange}
        ampmItems={ampmItems}
        ampmValue={ampm}
        onAmpmChange={handleAmpmChange}
      />
    </div>
  );
}
