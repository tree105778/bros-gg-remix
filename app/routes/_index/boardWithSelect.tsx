import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TraitSynergyTab from "./traitSynergyTab";
import BoardBuilder from "./boardBuilder";
import SelectBoard from "./selectBoard";

export default function BoardWithSelect() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TraitSynergyTab />
      <BoardBuilder />
      <SelectBoard />
    </DndProvider>
  );
}
