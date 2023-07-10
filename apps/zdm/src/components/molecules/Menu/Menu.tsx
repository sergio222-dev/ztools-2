interface MenuOptions {
  label: string;
}

interface MenuProps {
  options: Array<MenuOptions>;
}

export const Menu = ({ options }: MenuProps) => {
  return (
    <div className="list-group">
      {options.map(option => (
        <a href="" key={option.label} className="list-group-item list-group-item-action">
          {option.label}
        </a>
      ))}
    </div>
  );
};
