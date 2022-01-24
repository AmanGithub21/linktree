import { useContext } from "react";
import { HelperLinktreeContext } from "./Home";
import LinktreeListItem from "./LinktreeListItem";

function LinktreeList() {
    const { tree, deleteItem } = useContext(HelperLinktreeContext);
    return (
        <div className="LinktreeList">
            {tree.map((item) => {
                return (
                    <LinktreeListItem
                        key={item.id}
                        item={item}
                        deleteItem={deleteItem}
                        homePage={true}
                    />
                );
            })}
        </div>
    );
}

export default LinktreeList;
