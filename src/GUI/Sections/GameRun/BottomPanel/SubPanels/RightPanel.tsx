import { FC } from "react";
import { Entity } from "../../../../Entities";
import { CommandButtons } from "./CommandButtons";

interface IRightPanel {
  entity: Entity;
  callbacks: any;
}

export const RightPanel: FC<IRightPanel> = ({ entity, callbacks }) => {
  return <CommandButtons entity={entity} callbacks={callbacks} />;
};
