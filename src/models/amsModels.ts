import { ImageType } from './types';

export type AircraftRs = {
    aircrafts: AircraftDto[];
    pageData: PageData;
    statusCode: number;
    statusText: string;
}

export type PageData = {
    pegeNum: number;
    elements: number;
    total: number;
    pages: number;
    maxPageSize: number;
}

export type AircraftDto = {
    id?: number;
    model: string;
    manufacturer: string;
    releaseYear: number;
    seats: number;
    status: string;
}

export type UpdateAircraftRq = {
    id: number;
    model: string;
    manufacturer: string;
    releaseYear: number;
    seats: number;
    status: string;    
}

export type UpdateAircraftRs = {
    id: number;
    statusCode: number;
    statusText: string;
    //Пробрасываю из запроса
    aircraft: AircraftDto;
    image: ImageType;
}

export type AddAircraftRs = {
    id: number;
    statusCode: number;
    statusText: string;
    //Пробрасываю из запроса
    aircraft: AircraftDto;
    image: ImageType;
}

export type DeleteAircraftRs = {
    statusCode: number;
    statusText: string;
    //Пробрасываю из запроса
    id?: number;
}