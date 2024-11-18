import {AircraftDto} from './amsModels';

export type ImageType = {
    preview: string;
    raw: string;
}

export type SaveImageDbType = {
    id: number;
    image?: ImageType;
}

export type EditAircraftType = {
    aircraft: AircraftDto; 
    image: ImageType
}

export type DeleteAircraftType = {
    id?: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type SearchParams = {
    model?: string;
    manufacturer?: string;
    pageNum: number;
    pageSize: number;
}

export type SearchInfoParams = {
    model: string;
    manufacturer: string;
}
