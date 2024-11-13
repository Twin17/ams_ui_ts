import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AircraftDto } from "../models/amsModels";
import { Status } from '../models/types';
import { fetchAircrafts, editAircraft, addAircraft, deleteAircraft, saveImageToDb } from './asyncActions';

export interface AircrafSliceState {
  aircrafts: AircraftDto[];
  pages: number;
  status: string;
}

const initialState: AircrafSliceState = {
  aircrafts: [],
  pages: 1,
  status: Status.LOADING
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
      setAircrafts(state, action: PayloadAction<AircraftDto[]>) {
        state.aircrafts = action.payload;
        console.log('setAircrafts');
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAircrafts.pending, (state, action) => {
        state.status = Status.LOADING;
        state.aircrafts = [];
      });
  
      builder.addCase(fetchAircrafts.fulfilled, (state, action) => {
        const rs = action.payload;
        state.aircrafts = rs.aircrafts;
        state.pages = rs.pageData.pages;
        state.status = Status.SUCCESS;
      });
  
      builder.addCase(fetchAircrafts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.aircrafts = [];
      });

      builder.addCase(editAircraft.fulfilled, (state, action) => {
        const rs = action.payload;
        if (rs.statusCode === 0) {
          let newAircrafts = state.aircrafts
          newAircrafts.map((el,index) => {
            if (el.id === rs.aircraft.id) {
              newAircrafts[index] = rs.aircraft
            }
          })
          state.aircrafts = newAircrafts
          if (rs.image.preview && rs.aircraft.id) {
            saveImageToDb(rs.aircraft.id, rs.image)
          }
        } else {
          const mes = 'Ошибка редактирования записи в БД: ' + rs.statusText
          console.error(mes)
          alert(mes)
        }        
      });

      builder.addCase(editAircraft.rejected, (state, action) => {
        console.error('edit_error: ', action.error)
        alert('Ошибка редактирования записи в БД')
      });

      builder.addCase(addAircraft.fulfilled, (state, action) => {
        const rs = action.payload;
        if (rs.statusCode === 0) {
          // Меняем состояние aircrafts - к текущему списку aircrafts добавляем объект
          // состоящий из id ответа и списка переданных в запросе полей aircraft
          let aircraft = rs.aircraft
          aircraft.id = rs.id
          let newAircrafts = [{...aircraft}, ...state.aircrafts]
          state.aircrafts = newAircrafts;
          if (rs.image.preview && rs.aircraft.id) {
            saveImageToDb(rs.aircraft.id, rs.image)
          }
        } else {
          const mes = 'Ошибка добавления записи в БД: ' + rs.statusText
          console.error(mes)
          alert(mes)
        }
      });

      builder.addCase(addAircraft.rejected, (state, action) => {
        console.error('add_error: ', action.error)
        alert('Ошибка добавления записи в БД')
      });

      builder.addCase(deleteAircraft.fulfilled, (state, action) => {
        const rs = action.payload;

        if (rs.statusCode === 0) {
          // setAircrafts(aircrafts.filter(el => el.id !== id))
          let newAircrafts = state.aircrafts.filter(el => el.id !== rs.id)
          state.aircrafts = newAircrafts;
        } else {
          const mes = 'Ошибка удаления записи из БД: ' + rs.statusText
          console.error(mes)
          alert(mes)
        }
      });

      builder.addCase(deleteAircraft.rejected, (state, action) => {
        console.error('edit_error: ', action.error)
        alert('Ошибка удаления записи из БД')
      });
    }
});

export const { setAircrafts } = aircraftSlice.actions

export default aircraftSlice.reducer