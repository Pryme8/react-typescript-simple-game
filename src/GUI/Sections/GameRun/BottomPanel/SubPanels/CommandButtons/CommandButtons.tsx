import { FC, useCallback } from "react";
import { Box } from "@mui/material";
import { ButtonA } from "../../../../../Components";
import { Entity } from "../../../../../Entities";
import { Styles, Commands } from "../../../../../Constants";

interface ICommandButtons {
  entity: Entity;
  callbacks: any;
}

export const CommandButtons: FC<ICommandButtons> = ({ entity, callbacks }) => {
  const actionButtonBlock = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "300px",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  };

  const actionButtonStyle = {
    ...Styles.WhiteTextBlackOutline,
    ...{
      height: "32px",
      position: "relative"
    }
  };

  const selectedStyle = {
    "& .buttonCanvas": {
      transform: "translateY(-66.6666666%)"
    }
  };

  const getCommand = useCallback(() => {
    return callbacks.command.get;
  }, [callbacks.command.get]);

  const handleCommandClick = (command: string) => {
    callbacks.command.set(command);
  };

  const commandList = [
    Commands.Move,
    Commands.Items,
    Commands.Defend,
    Commands.Attack
  ];

  return (
    entity &&
    (entity.classDynamic === Entity.ClassDynamic.Self ||
      entity.classDynamic === Entity.ClassDynamic.Friendly) && (
      <Box sx={actionButtonBlock}>
        {commandList.map((_command: string) => (
          <ButtonA
            key={_command}
            sx={
              getCommand() !== _command
                ? actionButtonStyle
                : { ...actionButtonStyle, ...selectedStyle }
            }
            onClick={() => {
              handleCommandClick(_command);
            }}
          >
            {_command}
          </ButtonA>
        ))}
      </Box>
    )
  );
};
