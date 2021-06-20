import { useState } from "react";
import s from "./ToDo.module.scss";

const Form = ({ addNewTodo }) => {
  const [state, setstate] = useState("");

  const addCard = () => {
    addNewTodo(state);
    setstate("");
  };

  const newText = (newValue) => {
    if (newValue.length > 40) return;
    setstate(newValue);
  };

  return (
    <>
      <div className={s.form}>
        <input
          className={s.input}
          placeholder={"Add To Do"}
          value={state}
          onChange={(e) => newText(e.currentTarget.value)}
        />
        <button className={s.btn} onClick={addCard}>
          Add
        </button>
      </div>
    </>
  );
};

export default Form;
