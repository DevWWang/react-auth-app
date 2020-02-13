import React from 'react';
import { connect } from 'react-redux';

import { messageActions } from '../_actions';

class ChatroomPage extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            message: {
                project: this.props.match.params.chatroomId,
                user: this.props.user,
                message: '',
                photo: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount() {
        
    }

    handleChange(e) {
        this.setState({ typing: true });
        const { message } = this.state;
        this.setState({
            message: {
            	...message,
                message: e.target.value
            }
        });
    }

    handleSendMessage(e) {
        e.preventDefault();

		const { message } = this.state;
        this.props.sendMessage(message);
        this.setState({
            message: {
            	...message,
                message: ''
            }
        });
    }
    
	render() {
		const { user, messages } = this.props;
		const { message } = this.state;
		return (
			<div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <label htmlFor="message">Message</label>
				<input
					type="text"
					className="form-control"
					name="message"
					value={message.message}
					onChange={this.handleChange}
					onKeyPress={(e) => {
		    			if (e.key === 'Enter') {
		    				this.handleSendMessage(e);
		    			}
		    		}}
				/>
			</div>
		);
	}
}

function mapState(state) {
	const { messages, authentication } = state;
    const { user } = authentication;
    return { user, messages };
}

const actionCreators = {
    getMessages: messageActions.getAll,
    sendMessage: messageActions.send
}

const connectedChatroomPage = connect(mapState, actionCreators)(ChatroomPage);
export { connectedChatroomPage as ChatroomPage };