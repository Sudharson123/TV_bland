import React, { useEffect, useState } from "react";
import axios from "axios";
function Details(props) {
  const data = props.name;
  let text = data.summary.substring(3, data.summary.length - 4);
  text = text.replace("<b>", "");
  text = text.replace("</b>", "");
  const img = "./stars/";
  const rating = String(Math.floor(data.rating.average / 2));
  const [crew, setCrew] = useState("");
  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${data.id}?embed=cast`)
      .then((res) => JSON.stringify(res.data._embedded.cast))
      .then((data) => setCrew(JSON.parse(data)));
  }, []);
  return (
    <div className="outer">
      <div id="hh">
        <img
          src="./stars/back.png"
          alt="back"
          onClick={() => {
            props.value();
          }}
        />
        <h3>TV Bland</h3>
      </div>
      <div className="detailcard">
        <img id="detailimg" src={data.image.original} alt={data.name} />

        <div className="sumsection">
          <div className="ratsection">
            <img
              id="rating"
              src={img.concat(`${rating}.jpg`)}
              alt={data.name}
            />
            <p>{rating}/5</p>
          </div>
          <div className="summary">
            <h1>{data.name}</h1>
            <p id="text">{text}</p>
          </div>
        </div>
      </div>
      <div className="crew">
        <div>
          <h1 id="show">Show info</h1>
          <div className="info">
            <h4>Streamed on</h4>
            <p>{data.network.name}</p>
            <h4>Schedule</h4>
            <p>{data.schedule.days}</p>
            <h4>Status</h4>
            <p>{data.status}</p>
            <h4>Genres</h4>
            <p>{data.genres}</p>
          </div>
        </div>
        <div className="center">
          <div className="starr">
            <p></p>
            <h1>Starring</h1>
            <p></p>
            {Array.from(crew).map((item, index) => {
              console.log(item.person);
              return (
                <>
                  <div className="float">
                    <img
                      src={item.person.image ? item.person.image.medium : ""}
                      alt={item.person.name}
                    />
                    <p>{item.person.name}</p>
                    <p>as</p>
                    <p>{item.character.name}</p>
                  </div>
                  <hr></hr>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
