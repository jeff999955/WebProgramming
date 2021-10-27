import './App.css'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
// import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  DELETE_MESSAGES_MUTATION,
  MESSAGES_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from './graphql'

function App() {
  // const { status, opened, messages, _sendMessage, clearMessages } = useChat()

  const [myname, setMyname] = useState('')
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [messages, setMessages] = useState([])
  const [login, setLogin] = useState(false)
  const [first, setFirst] = useState(true)
  const [status, setStatus] = useState({})

  const bodyRef = useRef(null)
  const mynameRef = useRef(null)

  const { loading, error, data, subscribeToMore, refetch } = useQuery(MESSAGES_QUERY, { variables: { from: myname }})

  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  const [deleteMessages] = useMutation(DELETE_MESSAGES_MUTATION)

  // const { subMessage } = useSubscription(
  //   DELETE_SUBSCRIPTION,
  //   {
  //     onSubscriptionData: ({ subscriptionData: { data } }) => {
  //       refetch()
  //     }
  //   }
  // )

  useEffect(() => {
    if (login && first) {
      setFirst(false)
      subscribeToMore({
        
        document: MESSAGES_SUBSCRIPTION,
        variables: { name: myname },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newS = subscriptionData.data.message
          if (newS.mutation == "CREATED") {
            const newMessage = subscriptionData.data.message.data
            console.log("here")
            console.log(newMessage)

            return {
              ...prev,
              getMessage: [...prev.getMessage, newMessage]
            }
          }
          if (newS.mutation == "DELETED") {
            
            return {
              ...[],
              getMessage: []
            }
          }
        }
      })
    }
  })

  const sendMessage = useCallback(
    () => {
      // e.preventDefault()
  
      if (!username || !body) return
  
      addMessage({
        variables: {
          from: myname,
          to: username,
          body: body
        }
      })

      console.log(body)
  
      // setUsername('')
      setMessages(() => [...messages, { from: myname, to: username, body: body }])
      setBody('')
      refetch()
    },
    [addMessage, username, body]
  )

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

  const clearMessages = useCallback(() => {
    deleteMessages()
    refetch()
    },
    [deleteMessages]
  )

  // useEffect(() => {
  //   if(!loading)
  //     setMessages(data.getMessage)
  //   displayStatus(status)
  // }, [status, loading])

  // useEffect(() => {
  //   displayStatus(status)
  // }, [status])

  return login? 
  (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {/* {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )} */
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error :(((</p>
        ) : (
          data.getMessage.map(({ id, from, to, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{from} -> {to}</Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username you want to send message to"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }

          sendMessage({ from: myname, to: username, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
  :
  (
    <div className="App">
        <div><h1>What's your name?</h1></div>
        <Input.Search
        rows={4}
        value={myname}
        ref={mynameRef}
        enterButton="Send"
        onChange={(e) => setMyname(e.target.value)}
        placeholder="Username"
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username.'
            })
            return
          }

          setLogin(true)

          // sendMessage()
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
