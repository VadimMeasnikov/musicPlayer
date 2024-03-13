import './searchinput.scss'

export default function SearchInput(props) {
  return (
    <div className="searchInput">
      <span></span>
      <input type="text" placeholder={props.placeholder} />
    </div>
  );
}
