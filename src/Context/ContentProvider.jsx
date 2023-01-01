import React, { useContext, useState } from "react";
import { researchElements } from "../data";

const ContentContext = React.createContext();

export function ContentProvider({ children }) {
  // create an object using the name property of the researchElements
  const [content, setContent] = useState(() => {
    // if there something on sessionStorage, use that | otherwise;
    const savedContent = JSON.parse(sessionStorage.getItem("content"));

    if (savedContent == null) {
      return researchElements.reduce((acc, element) => {
        acc[element.name] = "";
        return acc;
      }, {});
    }

    return savedContent;
  });

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
