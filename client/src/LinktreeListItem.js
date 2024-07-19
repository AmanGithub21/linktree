import React, { useContext } from "react";
import "./css/LinktreeListItem.css";
import { LogginContext } from "./Linktree";
import useToggle from "./hooks/useToggle";

import EditingForm from "./EditingForm";

function LinktreeListItem({ item, deleteItem, homePage }) {
  const { loggedIn } = useContext(LogginContext);
  const [isEditing, toggleIsEditing] = useToggle(false);

  return (
    <React.Fragment className="container-fluid">
      {isEditing ? (
        <EditingForm
          className="LinktreeList-item"
          initialText={item.text}
          initialUrl={item.url}
          itemId={item._id}
          toggleIsEditing={toggleIsEditing}
        />
      ) : loggedIn && homePage ? (
        <div key={item._id} className="">
          <div className="row">
            <div className="d-flex justify-content-center col-lg-10 col-md-10 col-sm-9 col-9">
              <a
                className="list-item-hyperlink"
                target="_blank"
                href={`${item.url}`}
              >
                <h3 className="LinktreeList-text">{item.text}</h3>
                <p className="LinktreeList-url">{item.url}</p>
              </a>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3">
              <i
                className="fas fa-trash icons"
                onClick={() => deleteItem(item._id)}
              ></i>
              <br />
              <i className="fas fa-edit icons" onClick={toggleIsEditing}></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="" key={item._id}>
          <div className="row LinktreeList-item d-flex justify-content-center">
            <div className="col-8">
              <a
                className="list-item-hyperlink"
                target="_blank"
                href={`${item.url}`}
              >
                <h3 className="LinktreeList-text">{item.text}</h3>
                <span className="LinktreeList-url">{item.url}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default LinktreeListItem;
