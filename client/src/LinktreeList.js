import { useContext } from "react";
import { HelperLinktreeContext } from "./Home";
import LinktreeListItem from "./LinktreeListItem";

function LinktreeList() {
    const { tree, deleteItem } = useContext(HelperLinktreeContext);
    return (
        <div className="LinktreeList">
            {tree.map((item) => {
                return <LinktreeListItem item={item} deleteItem={deleteItem} />;
            })}
        </div>
    );
}

export default LinktreeList;
