import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelInfoDto } from '../models/amsModels'
import { Status } from '../models/types';
import { fetchModelInfo } from './asyncActions'; 

export interface InfoSliceState {
    modelInfo: ModelInfoDto | null;
    modelInfoList: ModelInfoDto[]; // Для хранения кеша по моделям
    status: string;
}

const initialState: InfoSliceState = {
    modelInfo: null,
    modelInfoList: [],
    status: Status.LOADING
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
      setInfo(state, action: PayloadAction<ModelInfoDto>) {
        state.modelInfo = action.payload;
      },
      // getInfo(state): ModelInfoDto | null {
      //   if (state.modelInfo) {
      //     return state.modelInfo;
      //   }
      //   return null;
      // }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchModelInfo.pending, (state, action) => {
        state.modelInfo = null;
        state.status = Status.LOADING;
        return state;
      });
  
      builder.addCase(fetchModelInfo.fulfilled, (state, action) => {
        const info = action.payload[0]
        state.modelInfo = info;
        if (info) {
          state.modelInfoList = [...state.modelInfoList, info];
        }
        state.status = Status.SUCCESS;
      });
  
      builder.addCase(fetchModelInfo.rejected, (state, action) => {
        state.modelInfo = null;
        state.status = Status.ERROR;
      });
    }
});

export const { setInfo } = infoSlice.actions

export default infoSlice.reducer