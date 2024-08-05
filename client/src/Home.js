import { createContext, useState } from "react";
import axios from "axios";

import LinktreeForm from "./LinktreeForm";
import LinktreeList from "./LinktreeList";

export const HelperLinktreeContext = createContext();

function Home() {
  const linktree = JSON.parse(window.sessionStorage.getItem("linktree"));
  const username = JSON.parse(
    window.sessionStorage.getItem("userdata")
  ).username;

  const [tree, setTree] = useState(linktree.tree);

  const insertTreeData = async (text, url) => {
    if (!text.length || !url.length) return alert("Fill all the entries.");
    const res = await axios.post("http://linktree-ycwe.onrender.com/linktree", {
      userId: linktree.user,
      text,
      url,
    });
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
  };

  const deleteItem = async (itemId) => {
    const data = {
      userId: linktree.user,
      treeId: itemId,
    };
    await axios.delete("http://linktree-ycwe.onrender.com/linktree", {
      data,
    });
    const res = await axios.post(
      `http://linktree-ycwe.onrender.com/linktree/${linktree.user}`
    );
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
  };

  const updateItem = async (itemId, text, url) => {
    // Add spinner or loader with true
    const data = {
      userId: linktree.user,
      treeId: itemId,
      text,
      url,
    };
    const res = await axios.put(
      "http://linktree-ycwe.onrender.com/linktree",
      data
    );
    window.sessionStorage.setItem("linktree", JSON.stringify(res.data));
    setTree(res.data.tree);
    // Make spinner or loader value false
  };
  return (
    <HelperLinktreeContext.Provider value={{ tree, deleteItem, updateItem }}>
      <div className="Home">
        <h4 className="plain-text">Add new!</h4>
        <LinktreeForm insertTreeData={insertTreeData} />
        <hr />
        <h5 className="plain-text">
          Your page is hosted at:{" "}
          <a target="_blank" href={`http://localhost:3000/${username}`}>
            {`http://localhost:3000/${username}`}
          </a>
        </h5>
        {tree && tree.length && <LinktreeList />}
      </div>
    </HelperLinktreeContext.Provider>
  );
}

export default Home;
