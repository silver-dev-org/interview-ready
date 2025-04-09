import { useState } from "react";

const folder = {
  name: "",
  parentFolder: "",
  child: [],
};

const FileTreeViewerComponent = () => {
  const [tree, setTree] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("root");

  const addFolder = () => {
    setTree((prev) => [...prev, { type: "folder", value: fileName, parent: selectedFolder }]);
    setFileName("");
  };

  const addFile = () => {
    setTree((prev) => [...prev, { type: "file", value: fileName, parent: selectedFolder }]);
    setFileName("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setFileName(value);
  };

  const remove = (value) => {
    setTree(prev => prev.filter(file => file.includes))
  }

  const onSelect = (e) => {
    const { name } = e.target;

    setSelectedFolder(name);
  };

  return (
    <div className="file-tree-viewer">
      <header>
        <button onClick={addFolder}>add folder</button>
        <button onClick={addFile}>add file</button>
      </header>
      {/* <div>↓ →</div> */}
      <input type="text" value={fileName} onChange={onChange} />
      {/* {tree} */}
      {tree.map((item, index) => (
        <div key={index} name={item.value} onClick={onSelect} className="item">
          {item.value}

          <button onClick={() => remove(item.value)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default FileTreeViewerComponent;
