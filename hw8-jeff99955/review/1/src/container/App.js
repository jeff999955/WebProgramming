import './App.css'
import React, { useRef, useState } from 'react'
import ChatRoom from '../Components/ChatRoom'
import { Button, Input, message } from 'antd'
import { INSERT_MESSAGE_MUTATION } from '../graphql'
import { useMutation } from '@apollo/react-hooks'

function App() {
    const [login, setLogin] = useState(false)
    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const [body, setBody] = useState('')
    const [insertMessage] = useMutation(INSERT_MESSAGE_MUTATION)
    const bodyRef = useRef(null)

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s
            const content = {
                content: msg,
                duration: 0.5
            }

            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'info':
                    message.info(content)
                    break
                case 'danger':
                default:
                    message.error(content)
                    break
            }
        }
    }

    const sendMessage = () => {
        if (!receiver || !body) {
            displayStatus({
                type: 'error',
                msg: 'Please enter a username and a message body.'
            })
            return
        }
        insertMessage({
            variables: {
                sender: sender,
                receiver: receiver,
                body: body
            }
        })
        setReceiver('')
        setBody('')
    }

    return (
        (!login) ? (
            <div className="App">
                <div className="App-title">
                    <h1>Who are you ?</h1>
                </div>
                <Input.Search
                    placeholder="Your name"
                    value={sender}
                    onChange={(e) => { setSender(e.target.value) }}
                    enterButton="Is me!!"
                    style={{ marginBottom: 10 }}
                    onSearch={(e) => { setLogin(true) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            setLogin(true)
                    }}
                ></Input.Search>  
            </div>
        ) : (
            <div className="App">
                <div className="App-title">
                    <h1>Hi, {sender}</h1>
                    <Button type="primary" danger onClick={() => { setSender(''); setLogin(false) }}>
                        Logout
                    </Button>
                </div>
                <ChatRoom user={sender}>
                    
                </ChatRoom>
                <Input
                    placeholder="Who are you going to talk to..."
                    value={receiver}
                    onChange={(e) => { setReceiver(e.target.value) }}
                    style={{ marginBottom: 10 }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            bodyRef.current.focus()
                    }}
                ></Input>
                <Input.Search
                    rows={4}
                    ref={bodyRef}
                    value={body}
                    enterButton="Send"
                    onChange={(e) => setBody(e.target.value)}
                    onSearch={sendMessage}
                    placeholder="Type a message here..."
                ></Input.Search>             
            </div>
        )
    )
}

export default App
