import { FC, useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Modal } from "./Modal";

interface IPanel {
  children: any;
  panelStyle: any;
  contentStyle: any;
  horizontalScroll?: boolean;
}
export const Panel: FC<IPanel> = ({
  children,
  panelStyle,
  contentStyle,
  horizontalScroll
}) => {
  const wrapperStyle = {
    display: "block",
    overflow: "hidden"
  };

  const scrollBarStyle = {
    display: "block",
    overflow: "hidden",
    position: "relative",
    height: "1em",
    width: "calc(100% -2px)"
    // border: "1px solid black"
  };

  const modalStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  const trackStyle = {
    position: "absolute",
    top: 7,
    left: 16,
    right: 16,
    bottom: 7,
    borderRadius: "1em",
    border: "1px solid rgba(20, 20, 80, 0.85)",
    background: "rgba(20, 20, 140, 0.8)",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(20, 20, 120, 0.5)"
    },
    "&:hover *": {
      background: "rgba(100, 100, 200, 0.85)"
    }
  };

  const knotStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "0.5em",
    height: "0.5em",
    borderRadius: "1em",
    background: "rgba(80, 80, 180, 0.85)",
    marginTop: "0",
    pointerEvents: "none"
  };

  const parentRef = useRef<HTMLDivElement>(null);
  const knotRef = useRef<HTMLDivElement>(null);
  const contentSize = useRef<any>({});

  const getContentWidth = () => {
    const ref = parentRef?.current;
    const size = {
      w: 0,
      vw: 0,
      h: 0
    };
    if (ref) {
      const content = ref.firstChild.firstChild;
      size.w = content.scrollWidth;
    }
    return size;
  };

  const updateKnotSize = () => {
    const knot = knotRef?.current;
    const width = getContentWidth();
    contentSize.current = width;
    const barWidth = knot.parentElement.clientWidth;
    const ratio = barWidth / width.w;
    if (ratio < 1) {
      console.log(knot);
      knot.style.width = `${barWidth * ratio}px`;
    }
  };

  const handleXScroll = (event: Event) => {
    const ref = parentRef?.current;
    const knot = knotRef?.current;
    if (ref && knot) {
      const content = ref.firstChild.childNodes[2];
      const rect = event.target.getBoundingClientRect();
      const xPos = event.nativeEvent.clientX - rect.left;
      const xPercent = (xPos / rect.width).toFixed(3);
      const viewWidth = content.scrollWidth;
      const difference = viewWidth - content.clientWidth;
      const scrollTo = difference * xPercent;
      const barWidth = knot.parentElement.clientWidth;
      const knotWidth = knot.clientWidth;
      const knotDiff = (barWidth - knotWidth) * xPercent;

      knot.style.left = `${knotDiff}px`;
      content.scrollLeft = scrollTo;
    }
  };

  const handleClick = (event: Event) => {
    handleXScroll(event);
  };

  const handleXMove = (event: Event) => {
    if (globalThis.mouseButtonLeftDown) {
      handleXScroll(event);
    }
  };

  useEffect(() => {
    updateKnotSize();
  }, []);

  return (
    <Box sx={{ ...wrapperStyle, ...panelStyle }} ref={parentRef}>
      <Modal sx={{ ...wrapperStyle, ...contentStyle }}>{children}</Modal>
      {horizontalScroll && (
        <Box sx={{ ...scrollBarStyle }}>
          <Modal sx={modalStyle}>
            <Box
              sx={trackStyle}
              //onClick={handleClick}
              onPointerDown={handleClick}
              onMouseMove={handleXMove}
            >
              <Box sx={knotStyle} ref={knotRef}></Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};
