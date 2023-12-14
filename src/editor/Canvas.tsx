import * as React from "react";
import {Editor, modulate, toDomPrecision, useEditor, useQuickReactor, useValue} from "@tldraw/tldraw";
import {_ReactPixi, Container, Stage, useApp} from "@pixi/react";
import {TLShape, TLShapeId, TLUnknownShape} from "@tldraw/tlschema";
import {Box2d, ShapeUtil} from "@tldraw/editor";
import {useCanvasEvents} from "./utils/useCanvasEvents";
import {Matrix} from "@pixi/core";
import {Resizer} from "./utils/Resizer";

interface ShapeProps {
    id: TLShapeId;
    shape: TLShape;
    util: ShapeUtil<TLUnknownShape>;
    index: number;
    backgroundIndex: number;
    opacity: number;
    isCulled: boolean;
    maskedPageBounds: Box2d | undefined;
}

function Shape(props: ShapeProps) {
    return (
        <Container x={props.shape.x} y={props.shape.y}>
            {props.util.component(props.shape)}
        </Container>
    );
}

function ShapesToDisplay(props: {editor: Editor}) {
    const renderingShapes = useValue('rendering shapes', () => props.editor.getRenderingShapes(), [props.editor]);

    return (
        <>
            {renderingShapes.map((result) => (
                <Shape key={result.id + '_shape'} {...result} />
            ))}
        </>
    )
}

export function Canvas({ className }: { className?: string }) {
    const editor = useEditor();

   React.useEffect(() => {
        function transformCanvas() {
            if (!rContainer.current) {
                return;
            }

            const {x, y, z} = editor.getCamera();

            const offset =
                z >= 1
                    ? modulate(z, [1, 8], [0.125, 0.5], true)
                    : modulate(z, [0.1, 1], [-2, 0.125], true);

            const matrix = new Matrix().scale(z, z).translate(x + offset, y + offset);

            rContainer.current.transform.setFromMatrix(matrix);
        }

        editor.on("frame", transformCanvas)

        return () => {
            editor.off("frame", transformCanvas);
        }
    }, [editor]);

    // const { Background, SvgDefs } = useEditorComponents()

    //const rCanvas = React.useRef<HTMLDivElement>(null)
    //const rHtmlLayer = React.useRef<Container>(null)
    //const rHtmlLayer2 = React.useRef<HTMLDivElement>(null)

    /*useScreenBounds()
    useDocumentEvents()
    useCoarsePointer()

    useGestureEvents(rCanvas)
    useFixSafariDoubleTapZoomPencilEvents(rCanvas)*/

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

    const rContainer = React.useRef<_ReactPixi.IContainer>();
    const events = useCanvasEvents();

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
                backgroundColor: 0xFFFFFF
            }}
            {...events}
        >
            <Resizer editor={editor}/>

            <Container ref={rContainer as any}>
                <ShapesToDisplay editor={editor}/>
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