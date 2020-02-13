import { alertActions } from './';
import { history } from '../_helpers';
import { messageConstants } from '../_constants';
import { messageService } from '../_services';

export const messageActions = {
    send,
    getAllByProject
};

function send(message) {
    return dispatch => {
        dispatch(request(message));

        messageService.send(message)
            .then(
                message => { 
                    dispatch(success());
                    dispatch(alertActions.success('Message Send successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(message) { return { type: messageConstants.SEND_REQUEST, message } }
    function success(message) { return { type: messageConstants.SEND_SUCCESS, message } }
    function failure(error) { return { type: messageConstants.SEND_FAILURE, error } }
}

function getAllByProject(chatroomId) {
    return dispatch => {
        dispatch(request(chatroomId));

        messageService.getAllByProject(chatroomId)
            .then(
                message => { 
                    dispatch(success());
                    dispatch(alertActions.success('Update Chatroom successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(message) { return { type: messageConstants.GET_ALL_REQUEST, message } }
    function success(message) { return { type: messageConstants.GET_ALL_SUCCESS, message } }
    function failure(error) { return { type: messageConstants.GET_ALL_FAILURE, error } }
}