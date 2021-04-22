import * as esbuild from "esbuild-wasm";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = useCallback(async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm"
    });
  }, []);

  const onClick = useCallback(async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window"
      }
    });

    setCode(result.outputFiles[0].text);
  }, [input]);

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea
        onChange={e => setInput(e.target.value)}
        defaultValue={input}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));