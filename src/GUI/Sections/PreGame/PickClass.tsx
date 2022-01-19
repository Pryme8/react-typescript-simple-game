import { FC, useState, useCallback } from "react";
import {
  ButtonA,
  PersonSprite,
  Modal,
  Panel,
  TextInput
} from "../../Components";
import { Box } from "@mui/material";
import { ClassTypes } from "../../../Core/Constants";
import { RandomHumanName } from "../../../Core/";

interface IPickClass {
  callbacks: IPickClassCallbacks;
}
interface IPickClassCallbacks {
  pickClassClick: (name: string, className: string) => void;
}
export const PickClass: FC<IPickClass> = ({ pickClassClick }) => {
  const [selectedClass, setSelectedClass] = useState<number>(-1);
  const [nameInputValue, setNameInputValue] = useState<string>(
    RandomHumanName()
  );

  const classTypes = [
    ClassTypes.Adventurer,
    ClassTypes.Wizard,
    ClassTypes.Marksman,
    ClassTypes.Cleric
  ];

  const handleItemClick = (event: Event) => {
    const id = event.target.getAttribute("id");
    setSelectedClass(parseInt(id, 10));
  };

  const handlePickClass = useCallback(
    (event: Event) => {
      const className = classTypes[selectedClass].name;
      const name = nameInputValue;
      pickClassClick(name, className);
    },
    [selectedClass, nameInputValue]
  );

  const itemStyle = {
    position: "relative",
    display: "inline-block",
    width: "240px",
    whiteSpace: "initial"
  };

  const contentStyle = {
    display: "block",
    verticalAlign: "middle",
    boxSizing: "borderBox",
    position: "relative",
    height: "138px",
    padding: "1em"
  };
  const selectedStyle = {
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      border: "1px dashed rgba(200, 200, 180, 0.5)",
      left: 9,
      right: 9,
      top: 9,
      bottom: 9,
      borderRadius: 2.5,
      zIndex: 2
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      border: "1px dotted rgba(80, 80, 120, 0.5)",
      left: 12,
      right: 12,
      top: 12,
      bottom: 12,
      borderRadius: 2,
      zIndex: 2
    },
    "& .buttonCanvas": {
      transform: "translateY(-66.6666666%)"
    }
  };

  const descStyle = {
    fontSize: "0.65em"
  };

  const wrapperStyle = {
    display: "block",
    position: "absolute",
    color: "white",
    padding: "0.4em",
    borderRadius: "0.1em",
    left: "50%",
    top: "50%",
    width: "600px",
    height: "416px",
    transform: "translate(-50%, -50%)",
    textShadow:
      "rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px"
  };

  const panelStyle = {
    position: "relative",
    display: "block"
  };

  const panelContentStyle = {
    position: "relative",
    display: "block",
    whiteSpace: "nowrap",
    boxSizing: "borderBox",
    padding: "0.4em"
  };

  return (
    <Modal sx={wrapperStyle}>
      <Modal sx={{ position: "relative", padding: "0.2em 0.5em" }}>
        Pick your class:
      </Modal>
      <Modal
        sx={{ fontSize: "16px", position: "relative", padding: "0.2em 0.25em" }}
      >
        <TextInput
          id={"nameInput"}
          label={"Name:"}
          value={nameInputValue}
        ></TextInput>
      </Modal>
      <Panel
        panelStyle={panelStyle}
        contentStyle={panelContentStyle}
        horizontalScroll={true}
      >
        {classTypes.map(
          (item) =>
            (item.id === selectedClass && (
              <ButtonA
                sx={{ ...itemStyle, ...selectedStyle }}
                id={item.id}
                key={item.id}
                onClick={(event: any) => {
                  handleItemClick(event);
                }}
              >
                <Box sx={contentStyle}>
                  <Box>{item.name}</Box>
                  <PersonSprite spriteId={item.spriteId} />
                  <Box style={descStyle}>{item.desc}</Box>
                </Box>
              </ButtonA>
            )) || (
              <ButtonA
                id={item.id}
                sx={{ ...itemStyle }}
                key={item.id}
                onClick={(event: any) => {
                  handleItemClick(event);
                }}
              >
                <Box sx={contentStyle}>
                  <Box>{item.name}</Box>
                  <PersonSprite spriteId={item.spriteId} />
                  <div style={descStyle}>{item.desc}</div>
                </Box>
              </ButtonA>
            )
        )}
      </Panel>

      {(selectedClass !== undefined && selectedClass >= 0 && (
        <ButtonA sx={{ height: "2em" }} onClick={handlePickClass}>
          Pick Class
        </ButtonA>
      )) || (
        <ButtonA sx={{ opacity: "0.5", height: "2em" }} disabled={true}>
          Pick Class
        </ButtonA>
      )}
    </Modal>
  );
};
