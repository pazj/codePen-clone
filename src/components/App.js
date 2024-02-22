import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { FaJsSquare, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocalStorage'



function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
     <div className="pane top-pane">
        <Editor 
        language="xml" 
        icons= {<FaHtml5 style={{ fontSize: '1.5rem', color:"#E34F26", paddingRight:"5px"}} />}
        displayName="HTML" 
        value={html} 
        onChange={setHtml}/>
          <Editor 
        language="css" 
        icons= {<FaCss3Alt style={{ fontSize: '1.5rem', color: "#1572B6", paddingRight:"5px" }} />}
        displayName="CSS"
        value={css}
        onChange={setCss}/>
        <Editor 
        language="javascript"
        icons= {<FaJsSquare style={{ fontSize: '1.5rem', color:"#F0DB4F", paddingRight:"5px" }} />} 
        displayName="JS"
        value={js}
        onChange={setJs}/>
      
     </div>
     <div className="pane">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        style={{ border: "none" }} 
        width="100%"
        height="100%"
      />
     </div>
   
    </>
  );
}

export default App;
