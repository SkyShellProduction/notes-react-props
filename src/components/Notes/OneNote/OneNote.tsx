import React, {useState, MouseEvent} from 'react';
import {Props} from '../propsInterface';
import './one-note.scss';
interface Data {
    note: Props;
    deleteNote(id: number | null): void;
    setModalData(obj: Props): void;
    setShowModal(bool: boolean): void;
}

const OneNote = (props: Data) => {
    const {note, deleteNote, setModalData, setShowModal} = props;
    const [reverseClass, setReverseClass] = useState(false);
    //удаляет заметку
    function del (e: MouseEvent<HTMLAnchorElement>, id: number | null) {
        e.preventDefault();
        setReverseClass(true);
        setTimeout(() => {
            deleteNote(id);
        }, 300);
    }
    //устанавливает данные в модалку для редактирования 
    function setModal(e : MouseEvent<HTMLAnchorElement>, obj: Props) {
        e.preventDefault();
        setShowModal(true);
        setModalData(obj);
    }
    return (
        <div className={`notes__item ${reverseClass ? 'reverse' : ''}`}>
            <h3 className="notes__name">{note.title}</h3>
            <span className="notes__date">{note.date}</span>
            <p className="notes__descr">
                {note.text}
            </p>
            <div className="notes__control">
                <a href="#!" className="notes__edit" onClick={e => setModal(e, note)}>
                    <img src="@/assets/img/edit.svg" alt="" />
                    редактировать
                </a>
                <a href="#!" className="notes__delete" onClick={e => del(e, note.id)}>
                    <img src="@/assets/img/delete.svg" alt="" />
                    удалить
                </a>
            </div>
         </div>
    )
}
export default OneNote;