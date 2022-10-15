import React, { useState } from 'react';
import OneNote from './OneNote/OneNote';
import listIcon from '../../assets/img/list.svg';
import gridIcon from '../../assets/img/grid.svg';
import { Props } from './propsInterface';
import './notes.scss';

interface Data{
    notes: Array<Props> | [];
    deleteNote(id: number | null): void;
    setModalData(obj: Props): void;
    setShowModal(bool: boolean): void;
}
const Notes = (props: Data) => {
    const [grid, setGrid] = useState(true);
    const {notes, deleteNote, setModalData, setShowModal} = props;
    return (
        <div className="notes">
            <div className="container">
                <div className="notes__nav">
                    <h3 className="notes__title">{notes.length ? 'Все заметки' : 'Нет заметок'}</h3>
                    <button className="notes__checker" onClick={() => setGrid(!grid)}>
                        {grid ? <img src={listIcon} alt="" />
                        : <img src={gridIcon} alt="" />}
                        <span>{grid ? 'Список' : 'Сетка'}</span>
                    </button>
                </div>
                <div className={`notes__grid ${!grid ? 'column' : ''}`}>
                    {notes.map((item: Props) => {
                        return (
                                <OneNote 
                                    key={item.id}
                                    note={item} 
                                    deleteNote={deleteNote}
                                    setModalData={setModalData}
                                    setShowModal={setShowModal}
                                    ></OneNote>
                        )
                    })}
                </div> 
            </div>
        </div>
    )
}
export default Notes;