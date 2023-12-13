import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { CardShapeTool } from '../shapes/CardShape/CardShapeTool'
import { CardShapeUtil } from '../shapes/CardShape/CardShapeUtil'
import { uiOverrides } from './ui-overrides'
import * as React from "react";
import classes from "./Editor.scss";

const customShapeUtils = [CardShapeUtil]
const customTools = [CardShapeTool]

export function Editor() {
    return (
        <div className={classes.Editor}>
            <Tldraw
                // Pass in the array of custom shape classes
                shapeUtils={customShapeUtils}
                // Pass in the array of custom tool classes
                tools={customTools}
                // Pass in any overrides to the user interface
                overrides={uiOverrides}
            />
        </div>
    )
}
