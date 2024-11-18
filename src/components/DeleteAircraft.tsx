import {AircraftDto} from "../models/amsModels";
import {DeleteAircraftType} from "../models/types"

import { useAppDispatch  } from '../redux/store';
import { deleteAircraft } from '../redux/asyncActions';

export type DeleteAircraftProps = {
    aircraft?: AircraftDto;
    setDeleteActive: Function;
    imageUrl: React.MutableRefObject<string>;
}

export const DeleteAircraft: React.FC<DeleteAircraftProps> = ({aircraft, setDeleteActive, imageUrl}) => {
    const dispatch = useAppDispatch();

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
                <button type="button" id="delete-btn" onClick={() => {
                    let delParam: DeleteAircraftType = {
                        id: aircraft?.id
                    }
                    dispatch(deleteAircraft(delParam))
                    setDeleteActive(false)
                }
                }>Удалить</button>
            </form>
        </div>
    )

}
