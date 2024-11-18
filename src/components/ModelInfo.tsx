import { Status } from '../models/types';
import { useSelector } from 'react-redux';
import { selectInfo } from '../redux/store';

export const ModelInfo: React.FC = () => {
    const { modelInfo, status } = useSelector(selectInfo);

    const row = (name: string, val: string = '-----') => (
        <tr>
            <td>{name}</td>
            <td>{val}</td>
        </tr>
    )

    return (
        <div>
            {status === Status.LOADING ? (
                <header className="header">Загрузка информации о модели ...</header>
            ) : ( 
                <div>
                    <header className="header">Информация о модели</header>
                    <table>
                        <tbody>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                            {row('Модель', modelInfo?.model)}
                            {row('Производитель', modelInfo?.manufacturer)}
                            {row('Тип двигателя', modelInfo?.engine_type)}
                            {row('Тяга двигателя', modelInfo?.engine_thrust_lb_ft)}
                            {row('Максимальная скорость', modelInfo?.max_speed_knots)}
                            {row('Крейсерская скорость', modelInfo?.cruise_speed_knots)}
                            {row('ceiling_ft', modelInfo?.ceiling_ft)}
                            {row('takeoff_ground_run_ft', modelInfo?.takeoff_ground_run_ft)}
                            {row('landing_ground_roll_ft', modelInfo?.landing_ground_roll_ft)}
                            {row('gross_weight_lbs', modelInfo?.gross_weight_lbs)}
                            {row('empty_weight_lbs', modelInfo?.empty_weight_lbs)}
                            {row('Длина (фут)', modelInfo?.length_ft)}
                            {row('Высота (фут)', modelInfo?.height_ft)}
                            {row('wing_span_ft', modelInfo?.wing_span_ft)}
                            {row('range_nautical_miles', modelInfo?.range_nautical_miles)}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
