import React from "react";
import { Button } from "react-bootstrap";
import Editor from "./components/Editor";
import { researchElements } from "./data";
import { useContentContext } from "./Context/ContentProvider";
import DOMPurify from "dompurify";

function EditorContainer() {
  const { content, setContent } = useContentContext();

  function handleSubmit() {
    // sanitize html upon submitting
    let purifiedContent = Object.fromEntries(
      Object.entries(content).map(([key, value]) => {
        // if value is empty (quilljs returns empty text as `<p><br></p>`), return an empty string
        if (value === "<p><br></p>") {
          return [key, ""];
        }
        return [key, DOMPurify.sanitize(value)];
      })
    );

    console.log(purifiedContent);

    sessionStorage.setItem("content", JSON.stringify(purifiedContent));
  }

  return (
    <>
      {researchElements.map((el) => {
        return (
          <React.Fragment key={el.componentId}>
            <h3 className="text-capitalize">{el.name}</h3>
            <Editor
              containerId={el.componentId}
              content={content}
              setContent={setContent}
              name={el.componentName}
            />
          </React.Fragment>
        );
      })}
      <Button
        className="btn-primary d-inline-block w-100 mb-2"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
}

export default EditorContainer;
