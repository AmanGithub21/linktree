import useHandleChange from "./hooks/useHandleChange";

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
        <form onSubmit={handleSubmit}>
            <div className="linktree-title">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={text}
                    onChange={handleChangeText}
                    autoFocus
                />
            </div>
            <div className="linktree-url">
                <label htmlFor="url">URL</label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={handleChangeUrl}
                />
            </div>
            <button>Submit</button>
        </form>
    );
}
export default LinktreeForm;
