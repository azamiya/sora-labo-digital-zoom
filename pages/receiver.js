import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import {SORA_LABO_WS_URL} from "../consts/endpoints";
import Sora from '../assets/javascript/sora'

const ReceiverPage = () => {
  const videoRef = useRef(null);

  const [githubUserName, inputGithubUserName] = useState('')
  const [signalingKey, inputSignalingKey] = useState('')
  const [channelName, inputChannelName] = useState('sora-labo')

  const onConnectButtonClick = () => {
    const metadata = {
      signaling_key: signalingKey,
      turn_tcp_only: false,
      turn_tls_only: false
    }

    const soraConnection = Sora.connection(SORA_LABO_WS_URL);
    console.log(soraConnection)
    const channelId = `${githubUserName}@${channelName}`
    const recvonly = soraConnection.recvonly(channelId, metadata);
    recvonly.connect()
      .catch(e => {
        console.error(e);
      });

    recvonly.on('track', function(event) {
      console.log(event)
      const stream = event.streams[0];
      if (!stream) return;
      const remoteVideoId = 'remotevideo-' + stream.id;
      console.log(remoteVideoId)
      videoRef.current.srcObject = stream;
    });
  }

  useEffect(() => {
    const _githubUserName = localStorage.getItem('_githubUserName')
    if(_githubUserName) {
      inputGithubUserName(_githubUserName)
    }
    const _signalingKey = localStorage.getItem('_signalingKey')
    if(_signalingKey) {
      inputSignalingKey(_signalingKey)
    }
  }, [])

  return (
    <div>
      <Link href="/">
        <a>&#8826;- HOME</a>
      </Link>
      <h1>Receiver</h1>
      <div>
        <p>Github user name</p>
        <input value={githubUserName} onChange={e => {
          localStorage.setItem('_githubUserName', e.target.value)
          inputGithubUserName(e.target.value)
        }} />
        <p>Signaling key</p>
        <input value={signalingKey} onChange={e => {
          localStorage.setItem('_signalingKey', e.target.value)
          inputSignalingKey(e.target.value)
        }} />
        <p>Channel name</p>
        <input value={channelName} onChange={e => {
          inputChannelName(e.target.value)
        }} />
      </div>
      <div>
        <button
          className='connect'
          onClick={onConnectButtonClick}>CONNECT</button>
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
      `}</style>
    </div>
  )
}

export default ReceiverPage
