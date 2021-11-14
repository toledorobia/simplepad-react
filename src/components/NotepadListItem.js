import React, { useContext, useCallback, memo } from "react";
import PropTypes from 'prop-types'
import _ from 'lodash';
import { DataContext } from "../providers/DataProvider";

import { toastError } from "../libs/toast";
import { modalInputWithDelete, modalConfirm, modalLoading, modalClose } from "../libs/modal";

const NotepadListItem = ({ notepad }) => {

  const { getNotepads, setNotepad, updateNotepad, deleteNotepad, notepad: currentNotepad } = useContext(DataContext);
  const className = "btn btn-list" + (currentNotepad != null && currentNotepad.id === notepad.id ? " active" : "");

  const onOpenNotepad = useCallback(() => {
    setNotepad(notepad);
  }, [notepad, setNotepad]);

  const onEditNotepad = useCallback(async () => {
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
        await getNotepads();
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
          await deleteNotepad(notepad.id);
          await getNotepads();
          modalClose();
        }
      } catch (error) {
        toastError(error);
        console.log(error);
        modalClose();
      }
    }
  }, [notepad, deleteNotepad, updateNotepad]);

  return <>
    {/* <button type="button" className="list-group-item list-group-item-action" onClick={onOpenNotepad}>{notepad.name}</button> */}
    <div className="d-flex">
      {/* <button className={`${className} flex-shrink-1`} type="button">

      </button> */}
      <button type="button" className={`${className} w-90`} onClick={onOpenNotepad}>
        {!notepad.saved && <i className="bi bi-cloud me-2"></i>} 
        {notepad.saved && <i className="bi bi-cloud-check me-2"></i>} 
        {notepad.name}
      </button>
      <button type="button" className={`${className} flex-shrink-1 text-center`} onClick={onEditNotepad}><i className="bi-gear-fill"></i></button>
    </div>
  </>
};

NotepadListItem.propTypes = {
  notepad: PropTypes.object.isRequired,
}

export default memo(NotepadListItem, _.isEqual);
