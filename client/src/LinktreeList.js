import { useContext } from "react";
import { HelperLinktreeContext } from "./Home";
import LinktreeListItem from "./LinktreeListItem";

import "./css/LinktreeList.css";

function LinktreeList() {
  const { tree, deleteItem } = useContext(HelperLinktreeContext);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="LinktreeList col-lg-8 col-md-8 col-sm-8 col-10">
          {tree.length &&
            tree.map((item) => {
              return (
                <div className="LinktreeListItem">
                  <LinktreeListItem
                    key={item._id}
                    item={item}
                    deleteItem={deleteItem}
                    homePage={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default LinktreeList;
