import config from 'config';
import { authHeader } from '../_helpers';

export const messageService = {
    send,
    getAllByProject
};

function send(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    return fetch(`${config.apiUrl}/messages/send`, requestOptions).then(handleResponse);
}

function getAllByProject(chatroomId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/messages/${chatroomId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}