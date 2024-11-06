import "./Modal.css"

type ModalProps = {
  active: boolean; 
  setActive: Function;
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
//export const Modal = (active: boolean, setActive: Function, children: any) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal_content active" : "modal_content"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
