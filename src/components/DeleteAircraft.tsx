import {AircraftDto} from "../models/amsModels";

export type DeleteAircraftProps = {
    aircraft?: AircraftDto;
    onDelete: Function; 
    setDeleteActive: Function;
    imageUrl: React.MutableRefObject<string>;
}

export const DeleteAircraft: React.FC<DeleteAircraftProps> = ({aircraft, onDelete, setDeleteActive, imageUrl}) => {

    return (
        <div className="param-conteiner">
            <h2>Удаление техники</h2>
            <form id="delete-form" className="param-form">
                <img src={imageUrl.current} alt="dummy" className="row-image"/>
                <input id="del_id" type="hidden"/>
                <input id="del_model" readOnly className="param-input"/>
                <input id="del_manuf" readOnly className="param-input"/>
                <input id="del_year"  readOnly className="param-input" type="number"/>
                <input id="del_seats" readOnly className="param-input" type="number"/>
                <input id="del_status" readOnly className="param-input"/>
                <button type="submit" id="delete-btn" onClick={() => {
                    onDelete(aircraft?.id)
                    setDeleteActive(false)
                }
                }>Удалить</button>
            </form>
        </div>
    )

}
