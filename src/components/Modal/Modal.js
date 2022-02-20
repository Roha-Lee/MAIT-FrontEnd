import React, {useRef} from 'react';
import style from './Modal.module.css';
import NameForm from '../NameForm/NameForm';
import {postNewSubject} from '../../utils/AppUtils';

function Modal({ modalOpen, setModalState, subjects, setSubjects, headerText}) {
  const nameFormRef = useRef(null);

  // const onClickOutsideModal = (event) => {
  //   console.dir(event.target) // classList 에서 Modal_modal 찾아서 그거면 닫기? 
  //   console.log(ref.current.contains(target))
  //   if(event.target.classList.find(style.modal)){

  //   // }
  //   setModalState(false);
  // }
  // console.log(nameFormRef.current)
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
          {/* <footer>
            <button className={style.close} onClick={() => {}}>
              {' '}
              submit{' '}
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
// class Modal extends React.Component {
//   render() {
//     const { modalOpen, setModalState, subjects, headerText} = this.props;

//     return (
      // <div className={modalOpen ? [style.openModal, style.modal].join(' ') : style.modal}>
      //   {modalOpen ? (
      //     <section>
      //       <header>
      //         {headerText}
      //         <button className={style.close} onClick={() => setModalState(false)}>
      //           {' '}
      //           &times;{' '}
      //         </button>
      //       </header>
      //       <main>
      //           <NameForm 
      //             onAddSubject={this.props.onAddSubject}
      //             subjects={subjects}  
      //           />
      //       </main>
      //       <footer>
      //         <button className={style.close} onClick={() => setModalState(false)}>
      //           {' '}
      //           close{' '}
      //         </button>
      //       </footer>
      //     </section>
      //   ) : null}
      // </div>
//     );
//   }
// }

