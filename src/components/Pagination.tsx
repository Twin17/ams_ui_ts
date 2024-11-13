export type PaginationProps = {
    page: number;
    pages: number;
    onChangePage: (num: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({page, pages, onChangePage}) => {
    const maxBlocks = 4 // максимальное кол-во кубиков пагинации
    const sideBlocks = Math.floor((maxBlocks - 1)/2) // кубиков слева и справа
    // Расчет для отображения кубиков пагинации
    let pgs = Math.min(maxBlocks, pages) // сколько кубиков нужно отрисовать
    let pageA = Math.max(1, page - sideBlocks) // номер у первого кубика пагинации
    pgs = pgs - (page - pageA) - 1
    let pageZ = Math.min(page + pgs, pages) // номер у последнего кубика пагинации
    pgs = pgs - (pageZ - page)
    pageA = pageA - pgs    

    return (
        <ul id="ul_block" className="pagination">
            {/* {[...Array(pages.current)].map((_,idx) => (
                <li key={idx + 1} onClick={() => setPage(idx + 1)} className={page === (idx + 1) ? 'active' : ''}>{idx + 1}</li>
            ))} */}
            <li key={-1} onClick={() => onChangePage(1)}>{'<<'}</li>
            {[...Array(pageZ - pageA + 1)].map((_,idx) => (
                <li key={idx + pageA} onClick={() => onChangePage(idx + pageA)} className={page === (idx + pageA) ? 'active' : ''}>{idx + pageA}</li>
            ))}
            <li key={-2} onClick={() => onChangePage(pages)}>{'>>'}</li>
        </ul>
    )
}