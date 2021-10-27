// import { useState } from 'react'
// import { useQuery, useMutation } from '@apollo/react-hooks'
// import { MESSAGES_QUERY, CHATROOM_QUERY } from '../graphql'

// // const client = new WebSocket('ws://localhost:4000')

// const useChat = () => {
//     const [chatRoom, setChatRoom] = useState([])

//     const initChatRoom = (user) => {
//         const { loading, error, data, subscribeToMore } = useQuery(CHATROOM_QUERY, { 
//             variables: { user: "123" }
//         }) 
//         setChatRoom(data)
//     }

//     const getChatRoom = () => {
//         return chatRoom
//     }

//     return {
//         initChatRoom,
//         getChatRoom
//     }
// }

// export default useChat

