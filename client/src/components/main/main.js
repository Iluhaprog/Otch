import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AddToChatForm } from './AddToChat/AddToChat';
import ChatList from './ChatList/ChatList';
import CreateChat from './CreateChat/CreateChat';
import Header from './header/header';
import Messenger from './Messenger/Messenger';
import SearchResults from './SearchResults/SearchResults';
import Settings from './settings/settings';

class Main extends React.Component {
    state = {
        searchResults: [],
        isVisibleAddToChatForm: false,
        memberId: -1,
        selectedChat: {},
    }

    changeAddToChatFormVisibility(value) {
        this.setState({
            isVisibleAddToChatForm: value
        });
    }

    changeMemberId(id) {
        this.setState({
            memberId: id
        });
    }

    setSearchResults(results) {
        this.setState({
            searchResults: results,
        });
    }

    changeSelectedChat(chat) {
        console.log(chat);
        this.setState({
            selectedChat: chat
        });
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/auth' />

        return (
            <div className='wrapper wrapper_main'>
                <Header
                    userId={this.props.userId}
                    userName={this.props.userData.userName}
                    image={this.props.userData.image}
                    onSearch={this.setSearchResults.bind(this)}
                    onLogout={this.props.onLogout}
                />
                <ChatList
                    chatList={this.props.chatList}
                    changeChat={this.changeSelectedChat.bind(this)}
                />
                <AddToChatForm
                    chats={this.props.chatList}
                    visible={this.state.isVisibleAddToChatForm}
                    adminId={this.props.userId}
                    memberId={this.state.memberId}
                    changeVisibility={this.changeAddToChatFormVisibility.bind(this)}
                    webSocket={this.props.webSocket}
                />
                <Switch>
                    <Route path='/settings'>
                        <Settings
                            userId={this.props.userId}
                            onUpdate={this.props.updateUser}
                            name={this.props.userData.userName}
                            age={this.props.userData.age}
                        />
                    </Route>
                    <Route path='/create-chat'>
                        <CreateChat userId={this.props.userId} webSocket={this.props.webSocket} />
                    </Route>
                    <Route path='/search'>
                        <SearchResults
                            results={this.state.searchResults}
                            adminId={this.props.userId}
                            webSocket={this.props.webSocket}
                            changeMemberId={this.changeMemberId.bind(this)}
                            changeVisibility={this.changeAddToChatFormVisibility.bind(this)}
                        />
                    </Route>
                    <Route path='/chat/:name'>
                        <Messenger 
                            chat={this.state.selectedChat}
                            userId={this.props.userId}
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default Main;