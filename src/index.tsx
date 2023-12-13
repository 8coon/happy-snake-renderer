import * as React from "react";
import * as ReactDOM from "react-dom";
import {Editor} from "./editor/Editor";

function App() {
    return (
        <Editor/>
    );
}

const canvas = document.createElement("DIV");
document.body.appendChild(canvas);

ReactDOM.render(<App/>, canvas)
