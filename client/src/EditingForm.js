import { useContext } from "react";
import { HelperLinktreeContext } from "./Home";
import useHandleChange from "./hooks/useHandleChange";

function EditingForm({ initialText, initialUrl, itemId, toggleIsEditing }) {
    const { updateItem } = useContext(HelperLinktreeContext);
    const [text, setText, resetText] = useHandleChange(initialText);
    const [url, setUrl, resetUrl] = useHandleChange(initialUrl);
    const handleSubmit = (e) => {
        e.preventDefault();
        updateItem(itemId, text, url);
        resetText();
        resetUrl();
        toggleIsEditing();
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="text">Text</label>
                <input
                    type="text"
                    name="text"
                    id="text"
                    value={text}
                    onChange={setText}
                />
            </div>
            <div className="">
                <label htmlFor="url">Url</label>
                <input
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={setUrl}
                />
            </div>
            <button>Edit</button>
        </form>
    );
}

export default EditingForm;
