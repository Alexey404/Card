import { useState } from "react";
import s from "./App.module.scss";
import { ToDo } from "./Components/ToDo";
import Form from "./Components/Form";
import { DeleteOutlined } from "@ant-design/icons";

const App = () => {
  const [state, setState] = useState([{ id: 1, name: "Welcome", order: 1 }]);
  const [currentToDo, setCurrentToDo] = useState("");

  const removeTodo = (id, order) => {
    setState(
      [...state]
        .filter((todo) => todo.id !== id)
        .map((item) => {
          if (item.order > order) {
            return { ...item, order: item.order - 1 };
          }
          return item;
        })
    );
  };

  const updateTodo = (id, newValue) => {
    if (newValue === null) {
      removeTodo(id);
      return;
    }
    const updateArr = state.map((item) =>
      item.id === id ? { ...item, name: newValue } : item
    );
    setState(updateArr);
  };

  const addNewTodo = (value) => {
    if (!value || /^s*$/.test(value)) return;

    setState([
      ...state,
      {
        id: state[0]
          ? Math.max.apply(
              Math,
              state.map((i) => {
                return i.id;
              })
            ) + 1
          : 1,
        name: value,
        order: state[0]
          ? Math.max.apply(
              Math,
              state.map((i) => {
                return i.order;
              })
            ) + 1
          : 1,
      },
    ]);
  };

  console.log(state);

  const dropHandler = (e, card) => {
    e.preventDefault();

    setState(
      state.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentToDo.order };
        }
        if (c.id === currentToDo.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );

    e.target.style = {
      background: "linear-gradient(90deg, rgb(15, 11, 250), rgb(119, 22, 114))",
    };
  };

  const sortCard = (a, b) => {
    if (a.order < b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  const dropHandlerDelete = (e) => {
    e.preventDefault();
    removeTodo(currentToDo.id, currentToDo.order);
    e.target.style = {
      color: "rgb(200, 59, 11)",
      transition: "color 0.2s",
    };
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.color = "rgb(200, 59, 11)";
    e.target.style.fontSize = "100px";
    e.target.style.transition = "font-size color 0.2s";
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
    e.target.style = {
      color: "rgb(200, 59, 11)",
      transition: "color 0.2s",
    };
  };

  return (
    <div className={s.App}>
      <div className={s.heading}>Welcome</div>
      <Form addNewTodo={addNewTodo} />
      <div style={{ display: "flex" }}>
        <div className={s.cards}>
          {state.sort(sortCard).map((item, index) => (
            <ToDo
              key={item.id}
              item={item}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              setCurrentToDo={setCurrentToDo}
              dropHandler={dropHandler}
              index={index}
            />
          ))}
        </div>
        <div
          className={s.delete}
          onDrop={(e) => dropHandlerDelete(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragEndHandler(e)}
        >
          <DeleteOutlined
            className={s.iconDelete}
            onDragOver={(e) => e.stopPropagation}
            onDragLeave={(e) => e.stopPropagation}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
