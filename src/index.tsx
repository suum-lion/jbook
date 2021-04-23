import * as esbuild from "esbuild-wasm";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  const startService = useCallback(async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  }, []);

  const onClick = useCallback(async () => {
    if (!ref.current) return;

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window"
      }
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  }, [html, input]);

  useEffect(() => {
    startService();
  }, [startService]);

  return (
    <div>
      <textarea
        onChange={e => setInput(e.target.value)}
        defaultValue={input}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
