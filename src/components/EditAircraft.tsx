import {useState} from "react"
import {AircraftDto} from "../models/amsModels";
import {ImageType,EditAircraftType} from "../models/types"

import { useAppDispatch  } from '../redux/store';
import { editAircraft, addAircraft } from '../redux/asyncActions';

export type EditAircraftProps = {
    aircraft?: AircraftDto;
    setModalActive: Function;
    isAdd: boolean;
    imageUrl: React.MutableRefObject<string>;
}

export const EditAircraft: React.FC<EditAircraftProps> = ({aircraft, setModalActive, isAdd, imageUrl}) => {
    const dispatch = useAppDispatch();

    const [image, setImage] = useState<ImageType>({
        preview: '',
        raw: ''
    });

    const handlePhotoChange = (el: any) => {
        if (el.target.files.length) {
            setImage({
                preview: URL.createObjectURL(el.target.files[0]),
                raw: el.target.files[0],
            });
        }
    };

    return (
        <div className="param-conteiner">
            <h2>Параметры техники</h2>
            <form id="edit-form" className="param-form">
                <input id="upload-button" name="image" type="file" style={{display: 'none'}} onChange={handlePhotoChange}/>
                <label htmlFor="upload-button">
                    {image.preview ? (
                        <div>
                            <img src={image.preview} alt="dummy" className="row-image"/>
                            <li>Upload Image</li>
                        </div>
                    ) : (
                        <div>
                            <img src={imageUrl.current} alt="dummy" className="row-image"/>
                            <li>Upload Image</li>
                        </div>
                    )}
                </label>
                <input id="in_id" type="hidden"/>
                <input id="in_model" placeholder="Модель" required className="param-input"/>
                <input id="in_manuf" placeholder="Производитель" required className="param-input"/>
                <input id="in_year" placeholder="Год выпуска" required type="number" className="param-input"/>
                <input id="in_seats" placeholder="Количество мест" required type="number" className="param-input"/>
                <input id="in_status" placeholder="Статус" required className="param-input"/>
                <button type="submit" id="save-btn" onClick={() => {
                    let aircraftEdit: AircraftDto = {
                        model: (document.querySelector('#in_model') as HTMLInputElement).value,
                        manufacturer: (document.querySelector('#in_manuf')  as HTMLInputElement).value,
                        releaseYear: (document.querySelector('#in_year')  as HTMLInputElement).valueAsNumber,
                        seats: (document.querySelector('#in_seats') as HTMLInputElement).valueAsNumber,
                        status: (document.querySelector('#in_status') as HTMLInputElement).value
                    }
                    let airParam: EditAircraftType = {
                        aircraft: aircraftEdit,
                        image: image
                    }
                    if (isAdd) {
                        console.log('add call')
                        //onAdd(aircraftEdit, image)
                        dispatch(addAircraft(airParam));
                    } else {
                        aircraftEdit.id = aircraft?.id
                        console.log('edit_id = ', aircraftEdit.id)
                        dispatch(editAircraft(airParam));
                    }
                    setModalActive(false)
                }
                }>Сохранить</button>
            </form>
        </div>
    )
}
