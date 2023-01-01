import React from "react";
import { Container } from "react-bootstrap";
import { useContentContext } from "./Context/ContentProvider";
import { researchElements } from "./data";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function PreviewContent() {
  const { content } = useContentContext();

  function handleExport() {
    return; //TODO: html to docx|pdf
  }

  return (
    <>
      <Container id="document">
        {/* title */}
        <h1 className="text-center">Research Document</h1>

        {/* content */}
        {researchElements.map((el) => {
          // if a section(intro, conclusion, etc..) has content
          if (!content[el.name]) return null;
          const parsedHTML = parse(DOMPurify.sanitize(content[el.name]));
          // console.log(parse(content[el.name]));
          return (
            <React.Fragment key={el.name}>
              <h2 className="mt-5 text-capitalize">{el.name}</h2>
              {parsedHTML}
            </React.Fragment>
          );
        })}
      </Container>
      {/* export btn */}
      <button
        className="position-absolute btn btn-success d-block d-flex align-items-center"
        style={{
          bottom: "10%",
          right: "10%",
        }}
        // first arg is the component's root container id
        onClick={handleExport}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-file-earmark-arrow-up me-1"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
        Export
      </button>
    </>
  );
}

export default PreviewContent;
