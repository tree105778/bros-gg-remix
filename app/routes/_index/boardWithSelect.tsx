import TraitSynergyTab from './traitSynergyTab';
import BoardBuilder from './boardBuilder';
import SelectBoard from './selectBoard';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

export default function BoardWithSelect() {
  return (
    <DndProvider options={HTML5toTouch}>
      <TraitSynergyTab />
      <BoardBuilder />
      <SelectBoard />
    </DndProvider>
  );
}
