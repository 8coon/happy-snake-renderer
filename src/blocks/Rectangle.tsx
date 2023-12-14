import * as React from "react";
import {BlockProps} from "./block-props";
import {Graphics} from "@pixi/react";
import {Graphics as PixiGraphics} from "@pixi/graphics";
import {ColorSource} from "@pixi/color";

interface RectangleProps extends BlockProps {
    width: number;
    height: number;
    backgroundColor: ColorSource;
    borderColor: ColorSource;
    borderWidth: number;
}

export function Rectangle(props: RectangleProps) {
    const draw = React.useCallback((g: PixiGraphics) => {
        g.clear();
        g.beginFill(props.backgroundColor);
        g.lineStyle(props.borderWidth, props.borderColor);
        g.drawRect(0, 0, props.width, props.height);
        g.endFill();
    }, [props.backgroundColor, props.borderWidth, props.borderColor, props.width, props.height]);

    return (
        <Graphics draw={draw}/>
    );
}
