import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../../reduxToolkit/slices/historySlice";
import "./History.scss";

export default function History() {
  const data = useSelector((state) => state.history.historyArray);
  const [tracks, setTracks] = useState(data);
  console.log(tracks);
  return (
    <div className="wrapper">
      <div className="history">
        <h1 className="history__title"></h1>
        <div className="history__tracks"></div>
      </div>
    </div>
  );
}
