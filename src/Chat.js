import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {

    const [currentMsg, setCurrentMsg] = useState("")
    const [chatList, setChatList] = useState([])

    const sendMessage = async () => {
        if (currentMsg !== "") {
            const msgData = {
                room: room,
                author: username,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", msgData)
            setChatList((list) => [...list, msgData])
        }

    }

    useEffect(() => {
        console.log("receive_message data");
        socket.on("receive_message", (data) => {
            console.log("receive_message data", data);
            setChatList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                {chatList.map((item) => {
                    return (
                        <div className='message' id={username === item.author ? "other" : "you"}>
                            <div className='message-content'>
                                <p>{item.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p>{item.time}</p>
                                <p>{item.author}</p>
                            </div>
                        </div>
                    )
                })}


            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    placeholder='hey.....'
                    onChange={(e) => setCurrentMsg(e.target.value)}
                />
                <button onClick={sendMessage}>
                    &#9658;
                </button>
            </div>
        </div>
    )
}

export default Chat
