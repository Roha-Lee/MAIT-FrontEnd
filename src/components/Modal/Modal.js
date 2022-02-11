import React from 'react';
import style from './Modal.module.css';
import NameForm from '../NameForm/NameForm'

class Modal extends React.Component {
  render() {
    const { open, close, headerText } = this.props;

    return (
      <div className={open ? [style.openModal, style.modal].join(' ') : style.modal}>
        {open ? (
          <section>
            <header>
              {headerText}
              <button className={style.close} onClick={close}>
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
              <button className={style.close} onClick={close}>
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