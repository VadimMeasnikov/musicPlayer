import "./tab.scss";

export default function Tab({ info, onClick }) {
  const handleClick = () => {
    onClick(info.path);
  };
  return (
    <div className="tab" onClick={handleClick}>
      {info.name}
    </div>
  );
}
