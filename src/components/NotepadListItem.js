import React, { useCallback, memo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { toastError } from "../libs/toast";
import { modalInputWithDelete, modalConfirm, modalLoading, modalClose } from "../libs/modal";
import { updateNotepad, deleteNotepad } from "../backend/notepads";

const NotepadListItem = ({ notepad, onSelectNotepad }) => {
  const className = "btn btn-list" + (notepad.selected ? " active" : "");

  const handleOnSelectNotepad = useCallback(() => {
    if (!notepad.selected) {
      onSelectNotepad(notepad);
    }

  }, [notepad, onSelectNotepad]);

  const onEditNotepad = async() => {
    const response = await modalInputWithDelete(
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
        modalLoading();
        await updateNotepad(notepad.id, { name: response.value });
        modalClose();
      }
      catch (error) {
        toastError(error);
        modalClose();
      }
    }

    if (response.isDenied) {
      try {
        const response2 = await modalConfirm("Delete Simplepad", "Are you sure you want to delete this Simplepad?");

        if (response2.isConfirmed) {
          modalLoading();
          await deleteNotepad(notepad.id);
          modalClose();
        }
      }
      catch (error) {
        toastError(error);
        console.log(error);
        modalClose();
      }
    }
  };

  return <>
    {/* <button type="button" className="list-group-item list-group-item-action" onClick={onOpenNotepad}>{notepad.name}</button> */}
    <div className="d-flex">
      {/* <button className={`${className} flex-shrink-1`} type="button">

      </button> */}
      <button type="button"
        className={`${className} w-90`}
        onClick={handleOnSelectNotepad}
        title="Open simplepad">
        <i className="bi bi-file-earmark-text-fill me-2"></i>
        {notepad.name}
      </button>
      <button type="button"
        className={`${className} flex-shrink-1 text-center`}
        onClick={onEditNotepad}
        title="Edit simplepad">
        <i className="bi-gear-fill"></i>
      </button>
    </div>
  </>;
};

NotepadListItem.propTypes = {
  notepad: PropTypes.object.isRequired,
  onSelectNotepad: PropTypes.func.isRequired,
};

export default memo(NotepadListItem, (prevProps, nextProps) => {
  return prevProps.notepad.id === nextProps.notepad.id
    && prevProps.notepad.name === nextProps.notepad.name
    && prevProps.notepad.selected === nextProps.notepad.selected
    && _.isEqual(prevProps.onSelectNotepad, nextProps.onSelectNotepad);
});
