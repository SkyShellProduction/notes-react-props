import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import {Props} from '../Notes/propsInterface';
import './modal.scss';
interface Data {
    show: boolean;
    changeShow(bool: boolean): void;
    addOrEditNote(data: Props): void;
    modalData: Props;
    setModalData(obj: Props): void;
}
const Modal = (props: Data) => {
    const {show, changeShow, addOrEditNote, modalData, setModalData} = props;
    const modalRef = useRef(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    function clean(){
        changeShow(false);
        setTitle('');
        setText('');
        setModalData({
            title: '',
            text: '',
            id: null,
            date: ''
        });
    }
    function send(e: FormEvent){
       e.preventDefault();
       const obj = {
        title,
        text,
        date: new Date().toLocaleDateString(),
        id: modalData.id || null,
       };
       addOrEditNote(obj);
       clean();
    }
    useEffect(() => {
       if(modalData.id) {
        setTitle(modalData.title);
        setText(modalData.text);
       }

    }, [modalData])
    return (
        <CSSTransition
            nodeRef={modalRef}
            in={show}
            timeout={300}
            unmountOnExit
            classNames="my-modal">
                <div className="modal" ref={modalRef} onClick={() => clean()}>
                    <div className="modal__content" onClick={e => e.stopPropagation()}>
                        <h3 className="modal__title">{modalData.id ? 'Изменить' : 'Добавить' }</h3>
                        <form className="modal__form" onSubmit={e => send(e)}>
                            <input type="text" 
                                placeholder="Title" 
                                className="modal__input"
                                value={title}
                                onChange={e => setTitle(e.target.value)} 
                                required />
                            <textarea className="modal__input modal__area" 
                                placeholder="Content" 
                                value={text}
                                onChange={e => setText(e.target.value)} 
                                required ></textarea>
                            <div className="modal__control">
                                <a href="#!" className="modal__cancel" onClick={() => clean()}>Отмена</a>
                                <button className="modal__btn">{modalData.id ? 'Изменить' : 'Добавить' }</button>
                            </div>
                        </form>
                    </div>
                </div>
        </CSSTransition>
    )
}
export default Modal;