import {useState, useRef} from "react"
import {Aircraft} from "./Aircraft"
import {Modal} from "./Modal"
import {EditAircraft, EditAircraftProps} from "./EditAircraft"
import {DeleteAircraft, DeleteAircraftProps} from "./DeleteAircraft"
import {AircraftDto} from "../models/amsModels";

type AirsProps = {
    airs: AircraftDto[];
}

// function Aircrafts (airs: AircraftDto[], onAdd: Function, onEdit: Function, onDelete: Function) {
export const Aircrafts: React.FC<AirsProps> = ({airs}) => {
    const [editActive, setEditActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [aircraft, setAircraft] = useState<AircraftDto>()
    const [isAdd, setIsAdd] = useState(false)
    const imageUrl = useRef('')

    const deleteProps: DeleteAircraftProps = {
        aircraft,
        setDeleteActive,
        imageUrl
    }

    const editProps: EditAircraftProps = {
        aircraft,
        setModalActive: setEditActive,
        isAdd,
        imageUrl
    }

    if (airs.length > 0)
        return (
            <div>
                <button id="add-btn" onClick={() => {
                    (document.querySelector('#in_model') as HTMLInputElement).value = "";
                    (document.querySelector('#in_manuf') as HTMLInputElement).value = "";
                    (document.querySelector('#in_year') as HTMLInputElement).value = "";
                    (document.querySelector('#in_seats') as HTMLInputElement).value = "";
                    (document.querySelector('#in_status') as HTMLInputElement).value = "";
                    setIsAdd(true)
                    setEditActive(true)
                }
                }>Добавить</button>
                <Modal active={editActive} setActive={setEditActive}>
                    {/* <EditAircraft className="editAircraft" {...editProps}/> */}
                    <EditAircraft {...editProps}/>
                </Modal>
                <Modal active={deleteActive} setActive={setDeleteActive}>
                    {/* <DeleteAircraft className="deleteAircraft" {...deleteProps}/> */}
                    <DeleteAircraft {...deleteProps}/>
                </Modal>
                <table>
                    <tbody>
                    <tr>
                        <th>Изображение</th>
                        <th>Модель</th>
                        <th>Производитель</th>
                        <th>Год выпуска</th>
                        <th>Кол-во мест</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    {airs.map(el => (
                        <Aircraft 
                            //href=
                            key={el.id} el={el} 
                            setAircraft={setAircraft} 
                            setModalActive={setEditActive}
                            setDeleteActive={setDeleteActive}
                            setIsAdd={setIsAdd}
                            imageUrl={imageUrl}
                        />
                    ))}
                    </tbody>
                </table>
            </div>)
    else
        return (
            <div>
                <h3>Авиационная техника отсутствует</h3>
            </div>)      
}
