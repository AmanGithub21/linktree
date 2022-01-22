import "./css/LinktreeList.css";

function LinktreeList({ tree, deleteItem }) {
    return (
        <div className="LinktreeList">
            {tree.map((obj) => {
                return (
                    <div key={obj._id} className="LinktreeList-item">
                        <h3 className="LinktreeList-text">{obj.text}</h3>
                        <a target="_blank" href={`${obj.url}`}>
                            <p className="LinktreeList-url">{obj.url}</p>
                        </a>
                        <i
                            className="delete-icon fas fa-trash"
                            onClick={() => deleteItem(obj._id)}
                        ></i>
                    </div>
                );
            })}
        </div>
    );
}

export default LinktreeList;
