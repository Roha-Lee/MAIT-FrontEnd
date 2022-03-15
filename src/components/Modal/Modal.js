import {useRef} from 'react';
import style from './Modal.module.css';
import NameForm from '../NameForm/NameForm';

function Modal({ modalOpen, setModalState, subjects, setSubjects, headerText}) {
  const nameFormRef = useRef(null);

  return (
    <div 
    className={modalOpen ? [style.openModal, style.modal].join(' ') : style.modal}>
      {modalOpen ? (
        <section>
          <header>
            {headerText}
            <button className={style.close} onClick={() => setModalState(false)}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
              <NameForm 
                ref={nameFormRef}
                setSubjects={setSubjects}
                subjects={subjects}  
              />
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;

