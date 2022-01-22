import { useState } from "react";
import axios from "axios";

import LinktreeForm from "./LinktreeForm";
import LinktreeList from "./LinktreeList";

import "./css/Home.css";

function Home() {
    const linktree = JSON.parse(window.localStorage.getItem("linktree"));
    const [tree, setTree] = useState(linktree.tree);
    const insertTreeData = async (text, url) => {
        const res = await axios.post("http://localhost:8080/linktree", {
            userId: linktree.user,
            text,
            url,
        });

        window.localStorage.setItem("linktree", JSON.stringify(res.data));
        setTree(res.data.tree);
    };
    const deleteItem = async (itemId) => {
        const data = {
            userId: linktree.user,
            treeId: itemId,
        };
        await axios.delete("http://localhost:8080/linktree", {
            data,
        });
        const res = await axios.get(
            `http://localhost:8080/linktree/${linktree.user}`
        );
        window.localStorage.setItem("linktree", JSON.stringify(res.data));
        setTree(res.data.tree);
    };
    const updateItem = async (itemId) => {};
    return (
        <>
            <LinktreeForm insertTreeData={insertTreeData} />
            <LinktreeList
                tree={tree}
                deleteItem={deleteItem}
                updateItem={updateItem}
            />
        </>
    );
}

export default Home;
