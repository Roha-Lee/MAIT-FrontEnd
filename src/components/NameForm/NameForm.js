import style from './NameForm.module.css';

function NameForm({setSubjects, subjects, value, setValue, color, setColor, onSubmit}) {
  return (
    <form onSubmit={onSubmit} className={style.form}>
      <label className={style.formTitle}>
        <span>과목 입력</span>
        <input  required className={style.input} type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
      </label>
      <ColorPicker setColor={setColor}/>
    </form>
  );
}

export default NameForm;

