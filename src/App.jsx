import React, { useState } from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import PreviewContent from "./PreviewContent";
import { ContentProvider } from "./Context/ContentProvider";
import EditorContainer from "./EditorContainer";

const EDITOR_KEY = "editor";
const PREVIEW_KEY = "preview";

function App() {
  const [activeKey, setActiveKey] = useState(EDITOR_KEY);

  // !TODO: create a export button that will export(download) the file to a word document or pdf(in future)
  // !TODO: create a container similar to the `test.html` file

  return (
    <ContentProvider>
      <Container>
        <Tabs
          id="controlled-tab-example"
          className="py-2 mb-3 position-relative"
          activeKey={activeKey}
          onSelect={(selectedKey) => setActiveKey(selectedKey)}
        >
          {/* Editor Container */}
          <Tab eventKey={EDITOR_KEY} title={"Editor"}>
            <EditorContainer />
          </Tab>
          {/* Preview Content */}
          <Tab eventKey={PREVIEW_KEY} title={"Preview"}>
            <PreviewContent />
          </Tab>
        </Tabs>
      </Container>
    </ContentProvider>
  );
}
export default App;
