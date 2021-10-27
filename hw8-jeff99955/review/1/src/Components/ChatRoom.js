import './ChatRoom.css'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CHATROOM_QUERY, CHATROOM_SUBSCRIPTION } from '../graphql'
import { Tag } from 'antd'

function ChatRoom(props) {
	const [chatRoom, setChatRoom] = useState([])
	const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, { 
        variables: { user: props.user }
    }) 

    useEffect(() => {
    	if (data)
		    setChatRoom(data.chatRoom)
    }, [data])

    useEffect(() => {
    	subscribeToMore({
    		document: CHATROOM_SUBSCRIPTION,
    		variables: { user: props.user },
    		updateQuery: (prev, { subscriptionData }) => {
    			if (!subscriptionData) 
    				return prev
    			const newMessage = subscriptionData.data.chatRoom.data
    			return {...prev, chatRoom: [...prev.chatRoom, newMessage]}
    		}
    	})
    }, [subscribeToMore])

	return (
		<div className='App-ChatRoom'>
		{ loading ? (
				<p style={{ color: '#ccc' }}> Loading... </p>
		) : error ? (
				<p style={{ color: '#ccc' }}> Error :(( </p>
		) : (
			chatRoom.length === 0 ? (
				<p style={{ color: '#ccc' }}> No message... </p>
			) : (
				chatRoom.map(({sender, receiver, body}, i) => (
					<p className="App-message" key={i}>
                        <Tag color="blue">{sender + " -> " + receiver}</Tag> 
                        {body}
                    </p>
				))
			)
		)}

		
		</div>
	)
}

export default ChatRoom