import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { useState } from 'react';

interface DateTimeProps {
  onDateTimeChange?: (date: Date | null) => void;
}

export default function DateTime({ onDateTimeChange }: DateTimeProps) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);


  const handleChange = (date: any) => {
    setSelectedDateTime(date);
    if (onDateTimeChange) {
      onDateTimeChange(date);
    }
  }

  return (
    <div className='mt-4'>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
          <DateTimePicker
            label="Arrival Time"
            value={selectedDateTime}
            onChange={handleChange}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />

        </DemoContainer>
      </LocalizationProvider>

    </div>
  );
}