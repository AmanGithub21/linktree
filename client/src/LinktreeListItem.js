import { useContext } from "react";
import "./css/LinktreeListItem.css";
import { LogginContext } from "./Linktree";
import useToggle from "./hooks/useToggle";

import EditingForm from "./EditingForm";

function LinktreeListItem({ item, deleteItem, homePage }) {
    const { loggedIn } = useContext(LogginContext);
    const [isEditing, toggleIsEditing] = useToggle(false);

    return (
        <>
            {isEditing ? (
                <EditingForm
                    className="LinktreeList-item"
                    initialText={item.text}
                    initialUrl={item.url}
                    itemId={item._id}
                    toggleIsEditing={toggleIsEditing}
                />
            ) : (
                <div key={item._id} className="LinktreeList-item">
                    <h3 className="LinktreeList-text">{item.text}</h3>
                    <a target="_blank" href={`${item.url}`}>
                        <p className="LinktreeList-url">{item.url}</p>
                    </a>
                    {loggedIn && homePage && (
                        <>
                            <i
                                className="delete-icon fas fa-trash"
                                onClick={() => deleteItem(item._id)}
                            ></i>
                            <i
                                className="fas fa-edit"
                                onClick={toggleIsEditing}
                            ></i>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default LinktreeListItem;
