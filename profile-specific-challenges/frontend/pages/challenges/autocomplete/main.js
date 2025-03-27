import { useState } from "react";

const initTags = ["food", "religion", "culture", "nature"];
export default function AutocompleteComponent() {
  const [definedTags, setDefinedTags] = useState(initTags);
  const [tags, setTags] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const onSelect = (e) => {
    const { name } = e.target;

    setTags((prev) => {
      if (prev.includes(name)) {
        return prev.filter((tag) => tag !== name);
      }
      return [...prev, name];
    });
  };

  const onSearch = (e) => {
    const { value } = e.target;

    if (value === "") setDefinedTags(initTags);

    setDefinedTags((prev) => prev.filter((tag) => tag.includes(value)));
  };

  return (
    <div className="autocomplete">
      <label>Tags</label>
      <p>You can add some related tags to your post</p>
      <div className="search-box">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            <span>{tag}</span>
            <button onClick={() => setTags((prev) => prev.filter((tagN) => tagN !== tag))}>
              x
            </button>
          </div>
        ))}
        <input type="text" onClick={() => setShowOptions(true)} onChange={onSearch} />
        <button onClick={() => setShowOptions((prev) => !prev)}>
          {showOptions ? "collapse" : "expand"}
        </button>
      </div>

      {showOptions && (
        <div className="options">
          <hr />
          {definedTags.map((tag, index) => (
            <div className="option-row" key={index}>
              <input type="checkbox" name={tag} onChange={onSelect} checked={tags.includes(tag)} />
              <label>{tag[0].toUpperCase() + tag.slice(1)}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
