import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AircraftRs, UpdateAircraftRs, AddAircraftRs, DeleteAircraftRs } from "../models/amsModels";
import { SearchParams, ImageType, EditAircraftType, DeleteAircraftType } from '../models/types';

const mainHost = 'http://localhost:8080'
const getAircraftsUrl = mainHost + '/api/getAircrafts'
const addAircraftUrl = mainHost + '/api/addAircraft'
const updateAircraftUrl = mainHost + '/api/updateAircraft'
const deleteAircraftUrl = mainHost + '/api/deleteAircraft'
const saveImageUrl = mainHost + '/api/amsfile/save'

export const fetchAircrafts = createAsyncThunk<AircraftRs, SearchParams>(
    'aircrafts/fetch',
    async (params) => {
        const { model, manufacturer, pageNum, pageSize } = params;
        const { data } = await axios.post<AircraftRs>(getAircraftsUrl, {
            model: model,
            manufacturer: manufacturer,
            pageNum: pageNum,
            pageSize: pageSize            
        }, {
            headers: {'Content-Type': 'application/json'}
        });
        return data;
    }
);

export const addAircraft = createAsyncThunk<AddAircraftRs, EditAircraftType>(
    'aircrafts/add',
    async (params) => {
        const { aircraft, image} = params;
        const { data } = await axios.post<AddAircraftRs>(addAircraftUrl, {
            model: aircraft.model,
            manufacturer: aircraft.manufacturer,
            releaseYear: aircraft.releaseYear,
            seats: aircraft.seats,
            status: aircraft.status
        }, {
            headers: {'Content-Type': 'application/json'}
        });
        data.aircraft = aircraft;
        data.image = image;
        return data;
    }
);

export const editAircraft = createAsyncThunk<UpdateAircraftRs, EditAircraftType>(
    'aircrafts/edit',
    async (params) => {
        const { aircraft, image} = params;
        const { data } = await axios.post<UpdateAircraftRs>(updateAircraftUrl, {
            id: aircraft.id,
            model: aircraft.model,
            manufacturer: aircraft.manufacturer,
            releaseYear: aircraft.releaseYear,
            seats: aircraft.seats,
            status: aircraft.status
        }, {
            headers: {'Content-Type': 'application/json'}
        });
        data.aircraft = aircraft;
        data.image = image;
        return data;
    }
);

export const deleteAircraft = createAsyncThunk<DeleteAircraftRs, DeleteAircraftType>(
    'aircrafts/delete',
    async (params) => {
        const { id } = params;
        const { data } = await axios.post<DeleteAircraftRs>(deleteAircraftUrl, {
            id: id
        }, {
            headers: {'Content-Type': 'application/json'}
        });
        data.id = id;
        return data;
    }
);

export const saveImageToDb = async (id: number, image?: ImageType) => {
    if (!image) {
        return
    }
    let formData = new FormData();
    formData.append('file', image.raw);
    formData.append('aircraft_id', id.toString());
    await axios.post(saveImageUrl, 
        formData, 
        {headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.error('saveImageError: ', err)
        alert('Ошибка сохранения рисунка в БД')
    });
}
  