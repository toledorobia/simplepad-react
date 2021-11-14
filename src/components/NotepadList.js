import React, { useContext } from "react";
import { DataContext } from "../providers/DataProvider";
import NotepadListItem from "./NotepadListItem";
import _ from "lodash";
import { modalInput, modalLoading, modalClose } from "../libs/modal";

const NotepadList = () => {
  const { notepadsFilter, getNotepads, newNotepad, setQuery, setNewNotepadId } = useContext(DataContext);

  const onChangeFilter = _.debounce((e) => {
    setQuery(e.target.value);
  }, 500);

  const onNewNotepad = async () => {
    const response = await modalInput(
      "",
      "New Simplepad",
      "Name of the new Simplepad",
      (value) => {
        if (value.length == 0) {
          return "You must enter a name.";
        }
      }
    );

    if (!response.isConfirmed) {
      return;
    }

    try {
      modalLoading("Saving new simplepad...");

      const res = await newNotepad({
        name: response.value,
        language: "plaintext",
      });

      setNewNotepadId(res.id);
      
      modalClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (notepadsFilter == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-25 vh-100 container-list text-muted">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>
    <div className="d-flex flex-column full-height-navbar w-25 container-list">
      <div className="d-flex position-sticky">
        <input type="text" className="form-control rounded-0 input-search w-90" onChange={onChangeFilter} placeholder="Search..." aria-label="Search..." />
        <button className="btn btn-outline-secondary rounded-0 button-new-simplepad border-start-0 flex-shrink-1" onClick={onNewNotepad} type="button"><i className="bi bi-plus-square-fill"></i></button>
        {/* <button className="btn btn-outline-secondary" type="button">Button</button> */}
      </div>

      <div className="border-left-grey overflow-auto">
        <div className="border-0 rounded-0">
          {notepadsFilter.map(n => <NotepadListItem key={n.id} notepad={n} />)}
        </div>
      </div>
    </div>
  </>
};

export default NotepadList;
