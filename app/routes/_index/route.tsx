import BoardWithSelect from "./boardWithSelect";

export default function Index() {
  return (
    <div className="mx-auto my-0 border-2 border-black max-w-[768px]">
      <div className="border-2 border-yellow-500">
        <p>BROS.GG</p>
        <p>배치툴</p>
      </div>
      <BoardWithSelect />
    </div>
  );
}
