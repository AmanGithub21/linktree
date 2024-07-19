import useHandleChange from "./hooks/useHandleChange";
import React from "react";
import TextField from "@mui/material/TextField";

function LinktreeForm({ insertTreeData }) {
  const [text, handleChangeText, handleResetText] = useHandleChange("");
  const [url, handleChangeUrl, handleResetUrl] = useHandleChange("");
  const handleSubmit = (e) => {
    e.preventDefault();
    insertTreeData(text, url);
    handleResetText();
    handleResetUrl();
    document.querySelector("#title").focus();
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <form
          className="linktree-form col-lg-3 col-md-6 col-sm-10 col-10"
          onSubmit={handleSubmit}
        >
          <div className="linktree-title">
            {/* <label htmlFor="title">Title</label> */}
            <TextField
              id="title"
              label="Title"
              variant="standard"
              size="small"
              type="text"
              value={text}
              onChange={handleChangeText}
              className="mb-3"
              fullWidth
              color="dark"
            />
          </div>
          <div className="linktree-url">
            {/* <label htmlFor="url">URL</label> */}
            {/* <input type="url" id="url" value={url} onChange={handleChangeUrl} /> */}
            <TextField
              id="url"
              label="Link"
              variant="standard"
              size="small"
              type="text"
              value={url}
              onChange={handleChangeUrl}
              color="dark"
              fullWidth
            />
          </div>
          <button className="btn btn-large submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default LinktreeForm;
