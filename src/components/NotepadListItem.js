import React, { useCallback, memo, } from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

import { toastError, } from "../libs/toast";
import { modalInputWithDelete, modalConfirm, modalLoading, modalClose, } from "../libs/modal";

const NotepadListItem = ({ notepad, current, onSelectNotepad, }) => {
  console.log("NoteListItem", notepad.name, current);

  const className = "btn btn-list" + (current ? " active" : "");
  const handleOnSelectNotepad = useCallback(() => {
    onSelectNotepad(notepad);
  }, [notepad, onSelectNotepad]);

  const onEditNotepad = async () => {
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
        // await updateNotepad(notepad.id, { name: response.value, });
        //await getNotepads();
        modalClose();
      } catch (error) {
        toastError(error);
        modalClose();
      }
    }

    if (response.isDenied) {
      try {
        const response2 = await modalConfirm("Delete Simplepad", "Are you sure you want to delete this Simplepad?");

        if (response2.isConfirmed) {
          modalLoading();
          // await deleteNotepad(notepad.id);
          //await getNotepads();
          modalClose();
        }
      } catch (error) {
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
        onClick={handleOnSelectNotepad}>
        <i className="bi bi-file-earmark-text-fill me-2"></i>
        {notepad.name}
      </button>
      <button type="button"
        className={`${className} flex-shrink-1 text-center`}
        onClick={onEditNotepad}><i className="bi-gear-fill"></i></button>
    </div>
  </>;
};

NotepadListItem.propTypes = {
  notepad: PropTypes.object.isRequired,
  current: PropTypes.bool.isRequired,
  onSelectNotepad: PropTypes.func.isRequired,
};

export default memo(NotepadListItem, (prevProps, nextProps) => {
  return prevProps.notepad.id === nextProps.notepad.id
    && prevProps.notepad.name === nextProps.notepad.name
    && prevProps.current === nextProps.current
    && _.isEqual(prevProps.onSelectNotepad, nextProps.onSelectNotepad);
});
