import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Details from "./cardDetails";
export default function App() {
  const [dat, setData] = useState("");
  const [curr, setCurr] = useState("");
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  const [togg, setTogg] = useState(false);
  const [sent, setSent] = useState(null);
  const img = "./stars/";
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows")
      .then((res) => JSON.stringify(res.data))
      .then((data) => {
        setData(JSON.parse(data));
        setCurr(JSON.parse(data).slice(0, 10));
      });
  }, []);

  const goto = (val) => {
    const selected = curr[val];
    setSent(selected);
    setTogg(true);
  };
  const back = () => {
    setTogg(false);
  };
  const move = (cond) => {
    if (cond === "next" && page !== dat.length / 10) {
      setCurr(dat.slice(page * 10, (page + 1) * 10));
      setPage(page + 1);
      setPrev(false);
      if (page === dat.length / 10 - 1) {
        setNext(true);
      }
    } else if (cond === "prev" && page !== 0) {
      setCurr(dat.slice((page - 1) * 10, page * 10));
      setPage(page - 1);
      setNext(false);
      if (page === 1) {
        setPrev(true);
      }
    }
  };

  return (
    <div className={!togg ? "App" : ""}>
      {!togg ? (
        <>
          {" "}
          <header></header>
          <h1 id="dash">TV Bland</h1>
          <div className="card">
            {Array.from(curr).map((item, index) => {
              return (
                <div
                  className="inner"
                  onClick={() => {
                    goto(index);
                  }}
                >
                  <img id="movieimg" src={item.image.medium} alt={item.name} />
                  <img
                    id="rating"
                    src={img.concat(
                      `${String(Math.floor(item.rating.average / 2))}.jpg`
                    )}
                    alt=""
                  />
                  <p id="name">{item.name}</p>
                </div>
              );
            })}
            <div className="btn">
              <button disabled={prev} onClick={() => move("prev")}>
                Prev
              </button>
              <button disabled={next} onClick={() => move("next")}>
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Details name={sent} value={back} />
        </>
      )}
    </div>
  );
}
