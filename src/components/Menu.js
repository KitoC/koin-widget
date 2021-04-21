const items = [{ label: "Help" }];

const MenuItem = ({ label }) => <div style={{ height: 100 }}>{label}</div>;

const Menu = () => {
  return (
    <div>
      {items.map((item) => (
        <MenuItem label={item.label} />
      ))}
    </div>
  );
};

export default Menu;
