import { takeEvery } from 'redux-saga/effects'
import { messageConstants } from '../_constants';

export const handleNewMessage = function* handleNewMessage(params) {
	yield takeEvery(messageConstants.RECEIVE_REQUEST, (action) => {
		params.socket.send(JSON.stringify(action));
	})
}