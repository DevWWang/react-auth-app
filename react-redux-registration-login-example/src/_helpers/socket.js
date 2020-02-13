import { messageConstants } from '../_constants';

export const setupSocket = (dispatch) => {
	const socket = new WebSocket('ws://localhost:8989');

	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: messageConstants.USER_JOINED
		}))
	}

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case messageConstants.RECEIVE_REQUEST:
				dispatch(receive(data.message, data.user));
				break;
			case messageConstants.CHATROOM_MEMBERS:
				dispatch(updateChatroomMembers(data.users));
				break;

			default:
				break;
		}
	}
	return socket;
}
