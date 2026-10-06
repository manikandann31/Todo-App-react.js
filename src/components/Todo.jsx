import React, { useEffect, useState } from "react";

const Todo = () => {

    const [items, setItems] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [item, setItem] = useState("");
    const [editId, setEditId] = useState(null);

    // Save todos to localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(items));
    }, [items]);


    // Add / Update Todo
    const handleClick = () => {

        const trimmedItem = item.trim();

        if (trimmedItem === "") {
            alert("Please enter a todo!");
            return;
        }

        // Update existing todo
        if (editId !== null) {

            setItems(
                items.map((todo) =>
                    todo.id === editId
                        ? { ...todo, text: trimmedItem }
                        : todo
                )
            );

            setEditId(null);
            setItem("");
            return;
        }

        // Check duplicate
        const alreadyExists = items.some(
            (todo) => todo.text.toLowerCase() === trimmedItem.toLowerCase()
        );

        if (alreadyExists) {
            alert("Todo already exists!");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: trimmedItem,
            completed: false
        };

        setItems([...items, newTodo]);
        setItem("");
    };


    // Delete Todo
    const deleteTodo = (id) => {
        setItems(items.filter((todo) => todo.id !== id));
    };


    // Complete Todo
    const toggleComplete = (id) => {
        setItems(
            items.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };


    // Edit Todo
    const editTodo = (todo) => {
        setItem(todo.text);
        setEditId(todo.id);
    };


    // Cancel Edit
    const cancelEdit = () => {
        setItem("");
        setEditId(null);
    };


    return (
        <div className="todo-container">

            <h1>Todo App</h1>

            <div className="input-section">

                <input
                    type="text"
                    placeholder="Enter a todo..."
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleClick();
                        }
                    }}
                />

                <button onClick={handleClick}>
                    {editId !== null ? "Update" : "Add"}
                </button>

                {editId !== null && (
                    <button
                        className="cancel-btn"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                )}

            </div>


            <div className="todo-info">

                <span>
                    Total: {items.length}
                </span>

                <span>
                    Completed: {items.filter(todo => todo.completed).length}
                </span>

            </div>


            <main>

                {items.length === 0 ? (

                    <p className="empty">
                        No todos yet!
                    </p>

                ) : (

                    <ul>

                        {items.map((todo) => (

                            <li
                                key={todo.id}
                                className={todo.completed ? "completed" : ""}
                            >

                                <span
                                    className="todo-text"
                                    onClick={() => toggleComplete(todo.id)}
                                >
                                    {todo.text}
                                </span>


                                <div className="actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() => editTodo(todo)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </li>

                        ))}

                    </ul>

                )}

            </main>

        </div>
    );
};

export default Todo;