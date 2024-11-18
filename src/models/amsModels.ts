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

export type ModelInfoDto = {
    manufacturer: string;
    model: string;
    engine_type: string;
    engine_thrust_lb_ft: string;
    max_speed_knots: string;
    cruise_speed_knots: string;
    ceiling_ft: string;
    takeoff_ground_run_ft: string;
    landing_ground_roll_ft: string;
    gross_weight_lbs: string;
    empty_weight_lbs: string;
    length_ft: string;
    height_ft: string;
    wing_span_ft: string;
    range_nautical_miles: string;
}
