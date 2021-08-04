import React, { useContext, useCallback } from "react";
import PropTypes from 'prop-types'
import { DataContext } from "../providers/DataProvider";

import modal from "../libs/modal";

const NotepadListItem = ({ notepad }) => {
  console.log("NotepadListItem", notepad.name);

  const { setNotepad, updateNotepad, deleteNotepad, notepad: currentNotepad } = useContext(DataContext);

  const className = "btn btn-list" + (currentNotepad != null && currentNotepad.id === notepad.id ? " active" : "");

  const onOpenNotepad = useCallback(() => {
    setNotepad(notepad);
  }, [notepad]);

  const onEditNotepad = useCallback(async () => {
    const response = await modal.inputTextWithDelete(
      notepad.name,
      "Edit Simplepad",
      "Name of the Simplepad",
      (value) => {
        if (value.length == 0) {
          return "You must enter a name.";
        }
      }
    );

    if (response.isConfirmed) {
      try {
        await updateNotepad(notepad.id, { name: response.value });
      } catch (error) {
        console.log(error);
      }
    }

    if (response.isDenied) {
      try {
        const response2 = await modal.confirm("Delete Simplepad", "Are you sure you want to delete this Simplepad?");

        if (response2.isConfirmed) {
          await deleteNotepad(notepad.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [notepad]);

  return <>
    {/* <button type="button" className="list-group-item list-group-item-action" onClick={onOpenNotepad}>{notepad.name}</button> */}
    <div className="d-flex">
      <button type="button" className={`${className} w-90`} onClick={onOpenNotepad}>{notepad.name}</button>
      <button type="button" className={`${className} flex-shrink-1 text-center`} onClick={onEditNotepad}><i className="bi-gear-fill"></i></button>
    </div>
  </>
};

NotepadListItem.propTypes = {
  notepad: PropTypes.object.isRequired,
}

export default NotepadListItem;
