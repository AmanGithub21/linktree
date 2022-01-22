import "./css/LinktreeListItem.css";
function LinktreeListItem({ item, deleteItem }) {
    return (
        <div key={item._id} className="LinktreeList-item">
            <h3 className="LinktreeList-text">{item.text}</h3>
            <a target="_blank" href={`${item.url}`}>
                <p className="LinktreeList-url">{item.url}</p>
            </a>
            <i
                className="delete-icon fas fa-trash"
                onClick={() => deleteItem(item._id)}
            ></i>
        </div>
    );
}

export default LinktreeListItem;
