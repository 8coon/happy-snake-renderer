import {Tldraw, TLEditorComponents} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { CardShapeTool } from '../shapes/CardShape/CardShapeTool'
import { CardShapeUtil } from '../shapes/CardShape/CardShapeUtil'
import { uiOverrides } from './ui-overrides'
import * as React from "react";
import classes from "./Editor.scss";
import {Stage} from "@pixi/react";
import {CanvasEditor} from "./CanvasEditor";

const customShapeUtils = [CardShapeUtil];
const customTools = [CardShapeTool];

function CustomContainer(props: {children?: any}) {
    return (
        <div id="CustomContainer">
            {props.children}
        </div>
    )
}

const components: TLEditorComponents = {
    Background: CustomContainer,
}

export function Editor() {
    return (
        <div className={classes.Editor}>
            <CanvasEditor
                // Pass in the array of custom shape classes
                shapeUtils={customShapeUtils}
                // Pass in the array of custom tool classes
                tools={customTools}
                // Pass in any overrides to the user interface
                overrides={uiOverrides}
                components={components}
            />
        </div>
    )
}
