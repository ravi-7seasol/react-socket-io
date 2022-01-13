import { useState } from "react";
import './App.css';
import io from "socket.io-client"
import Chat from "./Chat";

// const socket = io.connect("https://node-socket-io.vercel.app")
const socket = io.connect("http://localhost:5000/")

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const JoinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input type="text" placeholder="Jhon...." onChange={(e) => setUserName(e.target.value)} />
          <input type="text" placeholder="Room ID...." onChange={(e) => setRoom(e.target.value)} />
          <button onClick={JoinRoom}>
            Join a Room
          </button>
        </div>)
        :
        (
          <Chat socket={socket} username={userName} room={room} />
        )
      }
    </div>
  );
}

export default App;
