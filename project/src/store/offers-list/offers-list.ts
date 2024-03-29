import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName } from 'types/city';
import { SortingData } from 'types/sorting';
import { OffersList } from 'types/state';
import { DEFAULT_CITY, DEFAULT_SORTING, NameSpace } from 'const';

export const initialState: OffersList = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
};

export const offersList = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{ targetCity: CityName }>) => {
      const { targetCity } = action.payload;
      state.city = targetCity;
      state.sorting = DEFAULT_SORTING;
    },
    selectSorting: (state, action: PayloadAction<{ targetSorting: SortingData }>) => {
      const { targetSorting } = action.payload;
      state.sorting = targetSorting;
    },
  },
});

export const { changeCity, selectSorting } = offersList.actions;
