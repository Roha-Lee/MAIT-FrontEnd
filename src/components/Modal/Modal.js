import React from 'react';
import style from './Modal.module.css';
import NameForm from '../NameForm/NameForm'

class Modal extends React.Component {
  render() {
    const { modalOpen, setModalState, subjects, headerText} = this.props;

    return (
      <div className={modalOpen ? [style.openModal, style.modal].join(' ') : style.modal}>
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
                  onAddSubject={this.props.onAddSubject}
                  studyLog={this.props.studyLog} 
                  subjects={this.props.subjects}  
                />
            </main>
            <footer>
              <button className={style.close} onClick={() => setModalState(false)}>
                {' '}
                close{' '}
                
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
}

export default Modal;