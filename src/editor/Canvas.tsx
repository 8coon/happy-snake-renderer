import * as React from "react";
import {modulate, toDomPrecision, useEditor, useQuickReactor, useValue} from "@tldraw/tldraw";
import * as events from "events";
import {Container, Stage, useApp} from "@pixi/react";

function Shape() {
    return (
        <Container/>
    );
}

function ShapesToDisplay() {
    const editor = useEditor()

    const renderingShapes = useValue('rendering shapes', () => editor.getRenderingShapes(), [editor])

    return (
        <>
            {renderingShapes.map((result) => (
                <Shape key={result.id + '_shape'} {...result} />
            ))}
        </>
    )
}

function Resizer() {
    const pixi = useApp();

    React.useEffect(() => {
        function resize() {
            pixi.resizeTo = window;
            pixi.resize();
        }

        resize();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    });

    return null;
}

export function Canvas({ className }: { className?: string }) {
    const editor = useEditor()

    // const { Background, SvgDefs } = useEditorComponents()

    //const rCanvas = React.useRef<HTMLDivElement>(null)
    //const rHtmlLayer = React.useRef<Container>(null)
    //const rHtmlLayer2 = React.useRef<HTMLDivElement>(null)

    /*useScreenBounds()
    useDocumentEvents()
    useCoarsePointer()

    useGestureEvents(rCanvas)
    useFixSafariDoubleTapZoomPencilEvents(rCanvas)*/

    /*useQuickReactor(
        'position layers',
        () => {
            const htmlElm = rHtmlLayer.current
            if (!htmlElm) return
            const htmlElm2 = rHtmlLayer2.current
            if (!htmlElm2) return

            const { x, y, z } = editor.getCamera()

            // Because the html container has a width/height of 1px, we
            // need to create a small offset when zoomed to ensure that
            // the html container and svg container are lined up exactly.
            const offset =
                z >= 1 ? modulate(z, [1, 8], [0.125, 0.5], true) : modulate(z, [0.1, 1], [-2, 0.125], true)

            const transform = `scale(${toDomPrecision(z)}) translate(${toDomPrecision(
                x + offset
            )}px,${toDomPrecision(y + offset)}px)`
            htmlElm.style.setProperty('transform', transform)
            htmlElm2.style.setProperty('transform', transform)
        },
        [editor]
    )*/

    // const events = useCanvasEvents()

    /*const shapeSvgDefs = useValue(
        'shapeSvgDefs',
        () => {
            const shapeSvgDefsByKey = new Map<string, JSX.Element>()
            for (const util of objectMapValues(editor.shapeUtils)) {
                if (!util) return
                const defs = util.getCanvasSvgDefs()
                for (const { key, component: Component } of defs) {
                    if (shapeSvgDefsByKey.has(key)) continue
                    shapeSvgDefsByKey.set(key, <Component key={key} />)
                }
            }
            return [...shapeSvgDefsByKey.values()]
        },
        [editor]
    )*/

    /*const hideShapes = useValue('debug_shapes', () => debugFlags.hideShapes.get(), [debugFlags])
    const debugSvg = useValue('debug_svg', () => debugFlags.debugSvg.get(), [debugFlags])
    const debugGeometry = useValue('debug_geometry', () => debugFlags.debugGeometry.get(), [
        debugFlags,
    ])*/

    return (
        <Stage
            //ref={rCanvas}
            draggable={false}
            className={`tl-canvas${className ? (" " + className) : ""}`}
            data-testid="canvas"
            width={window.innerWidth}
            height={window.innerHeight}
            options={{
                resizeTo: window,
            }}
            {...events}
        >
            <Resizer/>

            <Container>
                <ShapesToDisplay/>
            </Container>

            <Container>
                {/*
                    <HandlesWrapper />
                    <BrushWrapper />
                    <ScribbleWrapper />
                    <ZoomBrushWrapper />
                    <SelectedIdIndicators />
                    <HoveredShapeIndicator />
                    <HintedShapeIndicator />
                    <SnapLinesWrapper />
                    <SelectionForegroundWrapper />
                    <LiveCollaborators />
                 */}
            </Container>
        </Stage>
    )
}