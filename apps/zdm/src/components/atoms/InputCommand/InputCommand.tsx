export const InputCommand = () => {
  return (
    <div className="relative">
      <input type="text" placeholder="type an entity..." className="form-control" />
      <div className="absolute flex items-center h-[38px] text-center top-0 right-4 text-[#DADADA]">
        <span className="p-1 badge text-[#DADADA] border-solid border-1 border-[#DADADA]">CTRL+K</span>
      </div>
    </div>
  );
};
