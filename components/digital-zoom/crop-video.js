import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const CropVideo = (props) => {
  const { videoRef } = props;
  // eslint-disable-next-line no-unused-vars
  const [intervalId, setIntervalId] = useState(0);
  const [sx, setSx] = useState(0);
  const [sy, setSy] = useState(0);
  const [sw, setSw] = useState(1000);
  const [sh, setSh] = useState(500);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [dw, setDw] = useState(4000);
  const [dh, setDh] = useState(2000);

  const canvasRef = useRef();

  useEffect(() => {
    const _sx = localStorage.getItem("__sx");
    const _sy = localStorage.getItem("__sy");
    const _sw = localStorage.getItem("__sw");
    const _sh = localStorage.getItem("__sh");
    const _dx = localStorage.getItem("__dx");
    const _dy = localStorage.getItem("__dy");
    const _dw = localStorage.getItem("__dw");
    const _dh = localStorage.getItem("__dh");

    setSx(Number(_sx));
    setSy(Number(_sy));
    setSw(Number(_sw));
    setSh(Number(_sh));
    setDx(Number(_dx));
    setDy(Number(_dy));
    setDw(Number(_dw));
    setDh(Number(_dh));
  }, []);

  const playButtonClick = () => {
    // const id = setInterval(() => {
    //   renderCanvas()
    // }, 500)
    //
    // setIntervalId(id)

    localStorage.setItem("__sx", String(sx));
    localStorage.setItem("__sy", String(sy));
    localStorage.setItem("__sw", String(sw));
    localStorage.setItem("__sh", String(sh));
    localStorage.setItem("__dx", String(dx));
    localStorage.setItem("__dy", String(dy));
    localStorage.setItem("__dw", String(dw));
    localStorage.setItem("__dh", String(dh));
  };

  const stopButtonClick = () => {
    clearInterval(intervalId);
  };

  // eslint-disable-next-line no-unused-vars
  const renderCanvas = () => {
    canvasRef.current
      .getContext("2d")
      .drawImage(videoRef.current, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay controls playsInline width="100%" />
      <div>
        <button onClick={playButtonClick}>PLAY</button>
        <button onClick={stopButtonClick}>STOP</button>
        <span>sx</span>
        <input
          value={sx}
          onChange={(e) => {
            setSx(Number(e.target.value));
          }}
        />
        <span>sy</span>
        <input
          value={sy}
          onChange={(e) => {
            setSy(Number(e.target.value));
          }}
        />
        <span>sw</span>
        <input
          value={sw}
          onChange={(e) => {
            setSw(Number(e.target.value));
          }}
        />
        <span>sy</span>
        <input
          value={sh}
          onChange={(e) => {
            setSh(Number(e.target.value));
          }}
        />
        <span>dx</span>
        <input
          value={dx}
          onChange={(e) => {
            setDx(Number(e.target.value));
          }}
        />
        <span>dy</span>
        <input
          value={dy}
          onChange={(e) => {
            setDy(Number(e.target.value));
          }}
        />
        <span>dw</span>
        <input
          value={dw}
          onChange={(e) => {
            setDw(Number(e.target.value));
          }}
        />
        <span>dh</span>
        <input
          value={dh}
          onChange={(e) => {
            setDh(Number(e.target.value));
          }}
        />
      </div>
      <p>Cropped video</p>
      <canvas ref={canvasRef} width="1560" height="840" />
    </div>
  );
};

CropVideo.propTypes = {
  videoRef: PropTypes.ref().isRequired,
};

export default CropVideo;
