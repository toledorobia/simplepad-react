import faker from "faker";

const NoteListItem = (props) => {
  return <>
    <a href="#" className="list-group-item list-group-item-action">{faker.hacker.noun()}</a>
  </>
};


export default NoteListItem;
