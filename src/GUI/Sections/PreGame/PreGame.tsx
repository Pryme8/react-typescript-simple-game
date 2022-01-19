import { FC } from "react";
import { PickClass } from "./PickClass";

interface IPreGame {
  callbacks: IPreGameCallbacks;
}
interface IPreGameCallbacks {
  pickClassClick: any;
}
export const PreGame: FC<IPreGame> = ({ callbacks }) => {
  return <PickClass pickClassClick={callbacks.pickClassClick} />;
};
