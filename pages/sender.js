import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Sora from "../assets/javascript/sora";
import { SORA_LABO_WS_URL } from "../consts/endpoints";

const SenderPage = () => {
  const videoRef = useRef(null);

  const [githubUserName, inputGithubUserName] = useState("");
  const [signalingKey, inputSignalingKey] = useState("");
  const [channelName, inputChannelName] = useState("sora-labo");

  useEffect(() => {
    const _githubUserName = localStorage.getItem("_githubUserName");
    if (_githubUserName) {
      inputGithubUserName(_githubUserName);
    }
    const _signalingKey = localStorage.getItem("_signalingKey");
    if (_signalingKey) {
      inputSignalingKey(_signalingKey);
    }
  }, []);

  const onConnectButtonClick = () => {
    const metadata = {
      signaling_key: signalingKey,
      turn_tcp_only: false,
      turn_tls_only: false,
    };

    const soraConnection = Sora.connection(SORA_LABO_WS_URL);
    const channelId = `${githubUserName}@${channelName}`;
    const sendonly = soraConnection.sendonly(channelId, metadata);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        sendonly.connect(mediaStream).then(() => {
          videoRef.current.srcObject = mediaStream;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <Link href="/">
        <a>&#8826;- HOME</a>
      </Link>
      <h1>Sender</h1>
      <div>
        <p>Github user name</p>
        <input
          value={githubUserName}
          onChange={(e) => {
            localStorage.setItem("_githubUserName", e.target.value);
            inputGithubUserName(e.target.value);
          }}
        />
        <p>Signaling key</p>
        <input
          value={signalingKey}
          onChange={(e) => {
            localStorage.setItem("_signalingKey", e.target.value);
            inputSignalingKey(e.target.value);
          }}
        />
        <p>Channel name</p>
        <input
          value={channelName}
          onChange={(e) => {
            inputChannelName(e.target.value);
          }}
        />
      </div>
      <div>
        <button className="connect" onClick={onConnectButtonClick}>
          CONNECT
        </button>
      </div>
      <div>
        <video ref={videoRef} autoPlay controls playsInline />
      </div>
      <style jsx>{`
        p {
          margin: 1rem 0 0;
        }
        button.connect {
          margin: 1rem 0;
        }
        video {
          width: 320px;
        }
      `}</style>
    </div>
  );
};

export default SenderPage;
