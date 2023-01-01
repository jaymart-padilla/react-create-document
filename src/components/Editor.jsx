import React, { useState, useEffect, useCallback } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import TOOLBAR_OPTIONS from "../utils/toolbar";

function Editor({ containerId, setContent, content, name }) {
  const [quill, setQuill] = useState();

  const handleChange = useCallback(
    (e) => {
      const name = e.name;
      const value = e.textContent ? e.innerHTML : "";

      setContent({ ...content, [name]: value });
    },
    [content, setContent]
  );

  // set the contents that are saved in the sessionStorage
  useEffect(() => {
    if (quill == null) return;
    const editorContent = document
      .getElementById(containerId)
      .querySelector(".ql-editor");

    // if storage empty, show default value
    let savedContent = JSON.parse(sessionStorage.getItem("content"));

    if (savedContent == null) savedContent = "Currently empty...";
    else savedContent = savedContent[name];

    editorContent.innerHTML = savedContent;
  }, [quill, containerId, name]);

  // save changes on editor
  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      const editorContent = document
        .getElementById(containerId)
        .querySelector(".ql-editor");

      editorContent.name = name;
      // if the html doesn't contain any raw text
      // if (!editorContent.textContent) return;
      handleChange(editorContent);
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, setContent, containerId, handleChange, name]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    editor.style = "height: 150px";
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
      theme: "snow",
    });

    setQuill(q);
  }, []);

  return <div id={containerId} ref={wrapperRef} className="mb-2"></div>;
}

export default Editor;
