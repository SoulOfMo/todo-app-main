import { useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [darkTheme, setDarkTheme] = useState("dark");
  const [sortBy, setSortBy] = useState("all");
  let sorted;

  if (sortBy === "all") sorted = todoItems;

  if (sortBy === "completed") {
    sorted = todoItems.slice().sort((a, b) => Number(b.done) - Number(a.done));
  }

  if (sortBy === "active") {
    sorted = todoItems.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }

  function handleSorted(sortby) {
    setSortBy(sortby);
  }
  function handleAddItem(item) {
    setTodoItems((items) => [...items, item]);
    console.log(todoItems);
  }

  function handleDeleteItem(id) {
    setTodoItems((items) => items.filter((item) => item.id !== id));
    console.log("oti lor");
  }

  function handleTheme() {
    setDarkTheme((curTheme) => (curTheme === "dark" ? "" : "dark"));
    console.log(darkTheme);
  }

  function handleChecked(id) {
    setTodoItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
    console.log("hhhh");
  }

  function handleClearList() {
    setTodoItems((items) => items.filter((item) => item.done === false));
  }

  return (
    <main className={darkTheme === "dark" ? "bg-light" : "dark bg-dark"}>
      <div className="container">
        <Nav handleTheme={handleTheme} themeState={darkTheme} />
        <Form onAddItems={handleAddItem} />
        <TodoList
          items={sorted}
          onDeleteItem={handleDeleteItem}
          onChecked={handleChecked}
          onClearList={handleClearList}
          onSorted={handleSorted}
          sortBy={sortBy}
        />
        <Action onSorted={handleSorted} sortBy={sortBy} />
      </div>
    </main>
  );
}

function Nav({ handleTheme, themeState }) {
  return (
    <div className="nav">
      <h1>todo</h1>
      <div className="toggle" onClick={handleTheme}>
        {themeState === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#FFF"
              fill-rule="evenodd"
              d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#FFF"
              fill-rule="evenodd"
              d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

function Form({ onAddItems }) {
  const [itemDesc, setItemDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (itemDesc === " ") return;

    const newItem = { itemDesc, done: false, id: Date.now() };
    onAddItems(newItem);
    console.log(newItem);

    setItemDesc("");
  }

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <div className="custom-radio"></div>
      <input
        type="text"
        value={itemDesc}
        placeholder="Create a new todo..."
        onChange={(e) => setItemDesc(e.currentTarget.value)}
      ></input>
    </form>
  );
}

function TodoList({
  items,
  onDeleteItem,
  onChecked,
  onClearList,
  onSorted,
  sortBy,
}) {
  const [focused, setFocused] = useState(null);

  return (
    <div className="item-container">
      <ul>
        {items.map((item) => (
          <li
            onMouseEnter={() => setFocused(item.id)}
            onMouseLeave={() => setFocused(null)}
            key={item.id}
          >
            <label>
              <input type="checkbox"></input>
              <span className="custom-radio" onClick={() => onChecked(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                  <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="2"
                    d="M1 4.304L3.696 7l6-6"
                  />
                </svg>
              </span>
              <p
                className={item.done === true ? "checked" : ""}
                onClick={() => onChecked(item.id)}
              >
                {item.itemDesc}
              </p>
            </label>

            {focused === item.id && (
              <button onClick={() => onDeleteItem(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="actions-container">
        <p>{items.length} items list</p>
        <div className="actions">
          <span
            className={sortBy === "all" ? "active" : ""}
            onClick={(e) => onSorted(e.currentTarget.textContent)}
          >
            all
          </span>

          <span
            className={sortBy === "active" ? "active" : ""}
            onClick={(e) => onSorted(e.currentTarget.textContent)}
          >
            active
          </span>
          <span
            className={sortBy === "completed" ? "active" : ""}
            onClick={(e) => onSorted(e.currentTarget.textContent)}
          >
            completed
          </span>
        </div>
        <p onClick={() => onClearList()}>Clear Completed</p>
      </div>
    </div>
  );
}

function Action({ sortBy, onSorted }) {
  return (
    <div className="actions mobile">
      <span
        className={sortBy === "all" ? "active" : ""}
        onClick={(e) => onSorted(e.currentTarget.textContent)}
      >
        all
      </span>

      <span
        className={sortBy === "active" ? "active" : ""}
        onClick={(e) => onSorted(e.currentTarget.textContent)}
      >
        active
      </span>
      <span
        className={sortBy === "completed" ? "active" : ""}
        onClick={(e) => onSorted(e.currentTarget.textContent)}
      >
        completed
      </span>
    </div>
  );
}

export default App;
