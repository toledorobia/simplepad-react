import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { modalInput, modalLoading, modalClose } from "../libs/modal";
import { toastError } from "../libs/toast";
import { setFilter, setNotepadById } from "../features/notepad/notepadSlice";
import { newNotepad } from "../backend/notepads";

import NotepadListItem from "./NotepadListItem";

const NotepadList = () => {
  const dispatch = useDispatch();

  const notepads = useSelector((state) => {
    const query = state.notepad.filter === null ? "" : state.notepad.filter.replace(/\s+/g, " ").toUpperCase();

    return state.notepad.notepads?.map((n) => ({
      id: n.id,
      name: n.name,
      selected: n.selected,
    })).filter((n) => query.length === 0 || n.name.toUpperCase().indexOf(query) > -1);
  }, (left, right) => _.isEqual(left, right));

  const onChangeFilter = _.debounce((e) => {
    dispatch(setFilter(e.target.value));
  }, 500);

  const onSelectNotepad = useCallback((notepad) => {
    dispatch(setNotepadById(notepad.id));
  }, [dispatch, setNotepadById]);

  const onNewNotepad = useCallback(async() => {
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

      dispatch(setNotepadById(res.id));
      modalClose();
    }
    catch (error) {
      modalClose();
      toastError(error);
    }
  }, [dispatch, setNotepadById]);

  if (notepads == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-25 vh-100 container-list text-muted">
        <div className="spinner-border text-light"
          role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column full-height-navbar w-25 container-list">
      <div className="d-flex position-sticky">
        <input type="text"
          className="form-control rounded-0 input-search w-90"
          onChange={onChangeFilter}
          placeholder="Search..."
          aria-label="Search..." />
        <button className="btn btn-outline-secondary rounded-0 button-new-simplepad border-start-0 flex-shrink-1"
          onClick={onNewNotepad}
          type="button"
          title="New simplepad">
          <i className="bi bi-plus-square-fill"></i>
        </button>
        {/* <button className="btn btn-outline-secondary" type="button">Button</button> */}
      </div>

      <div className="border-left-grey overflow-auto">
        <div className="border-0 rounded-0">
          {notepads.map((n) => (
            <NotepadListItem key={n.id}
              notepad={n}
              onSelectNotepad={onSelectNotepad} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotepadList;
