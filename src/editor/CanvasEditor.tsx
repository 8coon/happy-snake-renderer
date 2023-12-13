import * as React from "react";
import {
    defaultShapeTools,
    defaultShapeUtils, defaultTools,
    TldrawHandles, TldrawHoveredShapeIndicator,
    TldrawProps,
    TldrawScribble, TldrawSelectionBackground, TldrawSelectionForeground,
    TldrawUi,
} from "@tldraw/tldraw";

import {
    TldrawEditor,
} from '@tldraw/editor'

import {useShallowArrayIdentity, useShallowObjectIdentity} from "./utils/useIdentity";
import {Canvas} from "./Canvas";

export function CanvasEditor(props: TldrawProps) {
    const {
        children,
        maxImageDimension,
        maxAssetSize,
        acceptedImageMimeTypes,
        acceptedVideoMimeTypes,
        onMount,
        ...rest
    } = props

    const components = useShallowObjectIdentity(rest.components ?? {})
    const shapeUtils = useShallowArrayIdentity(rest.shapeUtils ?? [])
    const tools = useShallowArrayIdentity(rest.tools ?? [])

    const withDefaults = {
        initialState: 'select',
        ...rest,
        components: React.useMemo(
            () => ({
                Scribble: TldrawScribble,
                CollaboratorScribble: TldrawScribble,
                SelectionForeground: TldrawSelectionForeground,
                SelectionBackground: TldrawSelectionBackground,
                Handles: TldrawHandles,
                HoveredShapeIndicator: TldrawHoveredShapeIndicator,
                ...components,
            }),
            [components]
        ),
        shapeUtils: React.useMemo(() => [...defaultShapeUtils, ...shapeUtils], [shapeUtils]),
        tools:  React.useMemo(() => [...defaultTools, ...defaultShapeTools, ...tools], [tools]),
    };

    return (
        <TldrawEditor {...withDefaults}>
            <TldrawUi {...withDefaults}>
                <Canvas />
                {children}
            </TldrawUi>
        </TldrawEditor>
    )
}
