import React from "react";

export default class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            content: "",
            new_message: "",
            message_size: 0
        }
        this.textArea = React.createRef();
    }
    onMessageChange(event) {
        this.setState({
            ...this.state,
            new_message: event.target.value
        })
    }
    onKeyDown(event) {
        if (event.key === 'Enter') {
            console.log('do validate');
            this.onMessageSend(event)
        }
    }
    onMessageSend(event) {
        const { new_message } = this.state
        const { sendMessage, username } = this.props;
        const message = new_message
        this.setState({
            ...this.state,
            content: this.state.content + username + ': ' + message + '\n',
            new_message: ''
        })
        sendMessage(message)
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    scrollToBottom() {
        if (this.state.message_size < this.props.messages.length) {

            if (this.textArea.current) {
                this.textArea.current.scrollTop = this.textArea.current.scrollHeight
            }
            this.setState({
                ...this.state,
                message_size: this.props.messages.length
            })
        }
    }
    render() {
        const { new_message } = this.state
        const { messages } = this.props;
        const msgs = messages.map(m => {
            return `${m.username}: ${m.message}`
        })
        const content = msgs.join('\n')
        //console.log("Selected Item:",selectedItem)
        return (
            <div style={{ "height": "100%" }}>
                <div style={{
                    "display": "grid",
                    "gridTemplateColumns": "auto auto",
                    "gridColumnEnd": 2,
                    "padding": "1px"
                }}>
                    <textarea style={{
                        "gridColumn": "1 / 3",
                        "gridRow": 1,
                        "padding": "1px"
                    }}
                    rows="5"
                    value={content}
                    disabled
                    ref={this.textArea} />
                    <input style={{
                        "gridColumn": 1,
                        "gridRow": 2,
                        "padding": "1px"
                    }} type="text" value={new_message} onChange={this.onMessageChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)}></input>
                    <button style={{
                        "gridColumn": 2,
                        "gridRow": 2,
                        "padding": "1px"
                    }} text="" onClick={this.onMessageSend.bind(this)}>Send</button>
                </div>
            </div>
        );
    }
};