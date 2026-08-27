import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [items, setItems] = useState([
    // { id: 1, label: "Html", checked: false },
    // { id: 2, label: "CSS", checked: false },
    // { id: 3, label: "Javacript", checked: false },
  ]);

  const [newItem, setNewItem] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [currentId, setCurrentId] = useState(null);

  let handleChecked = (id) => {
    let checkedItem = items.map((item) => {
      return item.id == id ? { ...item, checked: !item.checked } : item;
    });
    setItems(checkedItem);
  };

  let handleAdd = () => {
    setItems([
      ...items,
      { id: items.length + 1, label: newItem, checked: false },
    ]);
    setNewItem("");
  };

  let handleEdit = (id) => {
    if (isEdit) {
      let updateItem = items.map((item) => {
        return item.id === currentId ? { ...item, label: newItem } : item;
      });
      setItems(updateItem);
      setNewItem("");
      setIsEdit(false);
      setCurrentId(null);
    } else {
      let newList = items.find((item) => {
        return item.id === id;
      });
      setNewItem(newList.label);
      setIsEdit(true);
      setCurrentId(id);
    }
  };

  let handleDelete = (id) => {
    let deleteItem = items
      .filter((item) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(deleteItem);
    setNewItem("");
  };

  return (
    <>
      <main
        style={{ height: "90vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div
          style={{
            boxShadow: "3px 7px 15px black",
            backgroundColor: "white",
            padding: "12px",
          }}
        >
          <div className="contain-box">
            <h4 className="text-center fw-semibold mb-4">
              Daily Task - Manage your todos at one place
            </h4>
            <h5>Add a Todo</h5>
            <div className="d-flex gap-2 border-bottom border-dark-subtle pb-3">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="form-control"
              />
              <button
                onClick={handleAdd}
                disabled={isEdit}
                className="btn bg-primary text-white"
              >
                Add
              </button>
            </div>
            <h5 className="pt-3 mb-4">Your Todo's</h5>
            {items.map((item) => {
              return (
                <ul className="list-unstyled" key={item.id}>
                  <li className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                      <input
                        type="checkBox"
                        checked={item.checked}
                        onChange={() => {
                          handleChecked(item.id);
                        }}
                      />
                      <label className="fs-5 fw-normal">{item.label}</label>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="btn btn-warning"
                      >
                        {isEdit ? "Save" : "Edit"}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
