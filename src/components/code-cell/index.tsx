import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useCallback, useState } from "react";
import bundle from "../../bundler";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import Resizable from "../resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = useCallback(async () => {
    const output = await bundle(input);
    setCode(output);
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          initialValue="const a = 1;"
          onChange={value => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
