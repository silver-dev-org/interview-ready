import AutocompleteComponent from "./autocomplete/main";
export default function Autocomplete() {
  return (
    <>
      <h1>Autocomplete Component</h1>
      <div>
        Build an autocomplete component.
        <br />
        <img
          src="https://github.com/user-attachments/assets/da852701-94f4-48c7-bb32-3daad55cb8e9"
          alt="Descriptive alt text for accessibility"
          className="optimized-img"
          loading="lazy"
          decoding="async"
          width="800"
          height="450"
          srcSet="https://github.com/user-attachments/assets/da852701-94f4-48c7-bb32-3daad55cb8e9 800w, 
              https://github.com/user-attachments/assets/da852701-94f4-48c7-bb32-3daad55cb8e9?width=400 400w"
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <br />
        <br />
        <ol>
          <li>It should allow multiple selection with checkboxes.</li>
          <li>Selected elements should show as tags with a button to delete the selection.</li>
          <li>Filtering by search text.</li>
          <li>Toggle button for expand/collapse list.</li>
        </ol>
        <br />
        <p>In a real interview situation you should be able to have the main functionalities (without styles) in 60 minutes.</p>
      </div>
      <hr />
      <AutocompleteComponent />
    </>
  );
}
