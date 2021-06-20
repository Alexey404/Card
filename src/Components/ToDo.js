import { useState } from "react";
import s from "./ToDo.module.scss";

export const ToDo = ({ item, updateTodo, setCurrentToDo, dropHandler }) => {
  const [isUpdate, setUpdate] = useState(false);
  const [newTodo, setNewTodo] = useState(item.name);

  const handler = () => {
    setUpdate(!isUpdate);
  };

  const newText = (e) => {
    const newValue = e.currentTarget.value;
    if (newValue.length > 40) return;
    setNewTodo(newValue);
  };

  const updateClikc = () => {
    if (!newTodo) {
      updateTodo(item.id, null);
    }
    if (/^s*$/.test(newTodo)) return;
    updateTodo(item.id, newTodo);
    handler();
  };

  const dragStartHandler = (e, item) => {
    setCurrentToDo(item);
    e.target.style.background = "rgba(1, 1, 1, 0.1)";
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
    e.target.style = {
      background: "linear-gradient(90deg, rgb(15, 11, 250), rgb(119, 22, 114))",
    };
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "rgba(1, 1, 1, 0.1)";
  };

  return (
    <div
      onDragStart={(e) => dragStartHandler(e, item)}
      onDrop={(e) => dropHandler(e, item)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      draggable={true}
      className={s.toDo}
    >
      {isUpdate ? (
        <>
          <input
            className={s.inputToDo}
            value={newTodo}
            autoFocus={true}
            onChange={newText}
            onBlur={updateClikc}
          />
        </>
      ) : (
        <div>
          <span className={s.ToDoText} onDoubleClick={handler}>
            {item.name}
          </span>
        </div>
      )}
    </div>
  );
};
