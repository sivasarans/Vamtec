// fetchDataSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { fetchData } from './fetchDataSlice';
import axios from 'axios';

jest.mock('axios');

describe('fetchData async thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        data: dataReducer,
      },
    });
  });

  it('should fetch data successfully', async () => {
    const mockData = [{ id: 1, title: 'Test Post' }];
    axios.get.mockResolvedValue({ data: mockData });

    await store.dispatch(fetchData());

    const state = store.getState().data;
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockData);
  });

  it('should handle fetch data failure', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));

    await store.dispatch(fetchData());

    const state = store.getState().data;
    expect(state.status).toBe('failed');
  });
});
