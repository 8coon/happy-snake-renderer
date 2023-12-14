import throttle from "lodash/throttle"
import { useLayoutEffect } from 'react'
import {Editor} from "@tldraw/tldraw";
import {useApp} from "@pixi/react";

interface ResizerProps {
    editor: Editor;
}

export function Resizer(props: ResizerProps) {
    const pixi = useApp();

    useLayoutEffect(() => {
        const updateBounds = throttle(
            () => {
                pixi.resizeTo = window;
                pixi.resize();
                props.editor.updateViewportScreenBounds();
            },
            200,
            {
                trailing: true,
            }
        )

        props.editor.updateViewportScreenBounds()

        // Rather than running getClientRects on every frame, we'll
        // run it once a second or when the window resizes / scrolls.
        const interval = setInterval(updateBounds, 1000)
        window.addEventListener('resize', updateBounds)
        window.addEventListener('scroll', updateBounds)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', updateBounds)
            window.removeEventListener('scroll', updateBounds)
        }
    }, [props.editor]);

    return null;
}