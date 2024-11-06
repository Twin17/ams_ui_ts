import {IoCloseCircleSharp, IoDocument} from 'react-icons/io5'
import {AircraftDto} from "../models/amsModels";

type AircraftProps = {
    el: AircraftDto; 
    setAircraft: Function; 
    setModalActive: Function; 
    setDeleteActive: Function; 
    setIsAdd: Function; 
    imageUrl: React.MutableRefObject<string>;
}

export const Aircraft: React.FC<AircraftProps> = ({el, setAircraft, setModalActive, setDeleteActive, setIsAdd, imageUrl}) => {

    const onEditIconAction = (el: AircraftDto) => {
        if (el.id) (document.querySelector('#in_id') as HTMLInputElement).value = el.id.toString();
        (document.querySelector('#in_model') as HTMLInputElement).value = el.model;
        (document.querySelector('#in_manuf') as HTMLInputElement).value = el.manufacturer;
        (document.querySelector('#in_year') as HTMLInputElement).valueAsNumber = el.releaseYear;
        (document.querySelector('#in_seats') as HTMLInputElement).valueAsNumber = el.seats;
        (document.querySelector('#in_status')  as HTMLInputElement).value = el.status;
        imageUrl.current = 'http://localhost:8080/api/amsmainfile/' + el.id;
        setAircraft(el);
        setIsAdd(false);
        setModalActive(true);
    }

    const onDeleteIconAction = (el: AircraftDto) => {
        if (el.id) (document.querySelector('#del_id')  as HTMLInputElement).value = el.id.toString();
        (document.querySelector('#del_model')  as HTMLInputElement).value = el.model;
        (document.querySelector('#del_manuf')  as HTMLInputElement).value = el.manufacturer;
        (document.querySelector('#del_year')  as HTMLInputElement).valueAsNumber = el.releaseYear;
        (document.querySelector('#del_seats')  as HTMLInputElement).valueAsNumber = el.seats;
        (document.querySelector('#del_status')  as HTMLInputElement).value = el.status;
        imageUrl.current = 'http://localhost:8080/api/amsmainfile/' + el.id;
        setAircraft(el);
        setDeleteActive(true);
    }

    return (
        <tr>
            <td>
                {/* <img src="https://reqres.in/img/faces/9-image.jpg" alt="" className="row-image"/> */}
                <img src={'http://localhost:8080/api/amsmainfile/' + el.id} alt="" className="row-image"/>
            </td>
            <td>{el.model}</td>
            <td>{el.manufacturer}</td>
            <td>{el.releaseYear}</td>
            <td>{el.seats}</td>
            <td>{el.status}</td>
            <td>
                <IoDocument className="edit-icon" onClick={() => onEditIconAction(el)} title="Редактировать"/>
                <IoCloseCircleSharp className="delete-icon" onClick={() => onDeleteIconAction(el)} title="Удалить"/>
            </td>
        </tr>
    )
}
