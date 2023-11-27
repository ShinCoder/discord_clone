import { memo, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';

import Select from '@components/Select';
import InputLabel from '@components/InputLabel';
import { MONTHS, NEAREST_BIRTH_YEAR, OLDEST_BIRTH_YEAR } from '@constants';

interface DateInputProps {
  handleSetValue: (value: Date) => void;
  error?: string;
  handleSetError: (error: string) => void;
  handleClearError: () => void;
}

const DateInput = (props: DateInputProps) => {
  const { handleSetValue, error, handleSetError, handleClearError } = props;

  const selectOptions = useMemo(
    () => ({
      days: Array.from({ length: 31 }, (value, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString()
      })),
      months: Array.from({ length: 12 }, (value, index) => ({
        value: Object.keys(MONTHS)[index],
        label: Object.values(MONTHS)[index].toString()
      })),
      years: Array.from(
        { length: NEAREST_BIRTH_YEAR - OLDEST_BIRTH_YEAR + 1 },
        (value, index) => ({
          value: (index + OLDEST_BIRTH_YEAR).toString(),
          label: (index + OLDEST_BIRTH_YEAR).toString()
        })
      ).reverse()
    }),
    []
  );

  const [selectState, setSelectState] = useState<{
    day?: string;
    month?: string;
    year?: string;
  }>({
    day: '',
    month: '',
    year: ''
  });

  useEffect(() => {
    if (
      selectState.day !== '' &&
      selectState.month !== '' &&
      selectState.year !== ''
    ) {
      const date = moment(
        `${selectState.month}-${selectState.day}-${selectState.year}`,
        'MM-DD-YYYY'
      );

      handleSetValue(date.toDate());

      if (date.isValid()) handleClearError();
      else handleSetError('Please enter a valid date of birth');
    }
  }, [selectState, handleSetValue, handleSetError, handleClearError]);

  return (
    <Box>
      <InputLabel
        label='Date of birth'
        error={error}
        isRequired
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '35%' }}>
          <Select
            value={selectState.month}
            handleChange={(e) => {
              setSelectState((state) => ({ ...state, month: e.target.value }));
            }}
            options={selectOptions.months}
            placeholder='Month'
          />
        </Box>
        <Box sx={{ width: '30%' }}>
          <Select
            value={selectState?.day}
            handleChange={(e) => {
              setSelectState((state) => ({ ...state, day: e.target.value }));
            }}
            options={selectOptions.days}
            placeholder='Day'
          />
        </Box>
        <Box sx={{ width: '30%' }}>
          <Select
            value={selectState?.year}
            handleChange={(e) => {
              setSelectState((state) => ({ ...state, year: e.target.value }));
            }}
            options={selectOptions.years}
            placeholder='Year'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(DateInput);
