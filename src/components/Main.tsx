import {useEffect} from "react"
import {Header} from "./Header"
import {Aircrafts} from "./Aircrafts"
import {Pagination} from "./Pagination"
import {Status} from "../models/types"

import { useSelector } from 'react-redux';
import { useAppDispatch, selectAircrafts, selectFilters } from '../redux/store';
import { setCurrentPage } from '../redux/filterSlice';
import { fetchAircrafts } from '../redux/asyncActions';

export const Main = () => {
    const dispatch = useAppDispatch();

    const { aircrafts, pages, status } = useSelector(selectAircrafts);
    const { page } = useSelector(selectFilters);

    const pageSize = 4 // кол-во строк на странице

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
    }

    const getItems = async () => {
        dispatch(
            fetchAircrafts({
                pageNum: page,
                pageSize: pageSize
            })
        );
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getItems();
    }, [page]);

    return (
        <div>
            <Header title="Список авиационной техники"/>
            {status === Status.LOADING ? (
                <main>
                    <h2>Идет загрузка ...</h2>    
                </main>
            ) : (
                <main>
                    <Aircrafts airs={aircrafts}/>
                    <Pagination page={page} pages={pages} onChangePage={onChangePage}/>
                </main>
            )}
        </div>
    )
}
