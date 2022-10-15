import React, { useEffect, useMemo, useRef, useState, Fragment } from "react";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import Notes from "./components/Notes/Notes";
import addNoteIcon from './assets/img/add-note.svg';
import { Props } from './components/Notes/propsInterface';
const firstNotes = localStorage.notes ? JSON.parse(localStorage.notes) : [];
function App() {
  const [notes, setNotes] = useState(firstNotes as Props[]);
  const [modalData, setModalData] = useState({} as Props);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const first = useRef(true);
  //фильтрация заметок по заголовку
  const filterNotes = useMemo(() => {
      return search ? notes.filter(c => c.title.toLowerCase().includes(search.toLowerCase())) : notes
  }, [search, notes]);
  //запись в localStorage при каждом изменении заметок
  useEffect(() => {
    if(first.current) {
      first.current = false;
      return
    };
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])
  function addOrEditNote(data: Props){
    if(data.id) {
      //редактирование заметки
        const temporaryNotes = notes.slice();
        const idx = temporaryNotes.findIndex(c => c.id === data.id);
        temporaryNotes[idx] = data;
        setNotes(temporaryNotes);
    }
    else {
      //добавление заметки
      setNotes((prev) => [...prev, {...data, id: Date.now()}]);
    }
    
  }
  function deleteNote(id: number | null) {
    setNotes((prev) => prev.filter(c => c.id !== id));
  }
  
  return (
    <Fragment>
        <Header doSearch={setSearch} />
        <Notes 
          notes={filterNotes} 
          deleteNote={deleteNote}
          setModalData={setModalData}
          setShowModal={setShowModal}/>
        <Modal 
          show={showModal} 
          changeShow={setShowModal} 
          addOrEditNote={addOrEditNote}
          modalData={modalData} 
          setModalData={setModalData}
          />
        <a href="#!" className="add__note" onClick={() => setShowModal(true)}>
          <img src={addNoteIcon} alt="" />
        </a>
    </Fragment>
  );
}

export default App;
