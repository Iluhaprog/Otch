import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { faChevronLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { AddToChatForm } from './AddToChat/AddToChat';
import ChatList from './ChatList/ChatList';
import CreateChat from './CreateChat/CreateChat';
import Header from './header/header';
import Messenger from './Messenger/Messenger';
import MobileNav from './MobileNav/MobileNav';
import SearchResults from './SearchResults/SearchResults';
import Settings from './settings/settings';
import TopBar from './TopBar/TopBar';
import SearchForm from './search/search';

class Main extends React.Component {
    state = {
        searchResults: [],
        isVisibleAddToChatForm: false,
        memberId: -1,
        selectedChat: {},
        topbar: {
            title: 'Chats',
            button: {
                inner: faPlusSquare,
                location: '/create-chat'
            }
        },
        queruParam: '',
        mobileMenu: true
    }

    changeTopBar(topbar) {
        this.setState({
            topbar: topbar
        });
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

    setSearchResults(results, queruParam) {
        this.setState({
            searchResults: results,
            queruParam: queruParam
        });
    }

    changeSelectedChat(chat) {
        this.setState({
            selectedChat: chat,
            mobileMenu: false,
            topbar: {
                title: chat.name,
                button: {
                    inner: faChevronLeft,
                    location: '/chat-list',
                    onClick: () => {
                        this.setState({
                            mobileMenu: true,
                            topbar: {
                                title: 'Chats',
                                button: {
                                    inner: faPlusSquare,
                                    location: '/create-chat',
                                }
                            }
                        })
                    }
                }
            }
        });
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/auth' />

        return (
            <div className={`wrapper wrapper_main ${this.state.mobileMenu ? '' : 'mobile-menu_hidden'}`}>
                <Header
                    userId={this.props.userId}
                    userName={this.props.userData.userName}
                    image={this.props.userData.image}
                    onSearch={this.setSearchResults.bind(this)}
                    onLogout={this.props.onLogout}
                />
                <ChatList
                    userId={this.props.userId}
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
                <TopBar data={this.state.topbar}/>
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
                        <div>
                            <SearchForm onSearch={this.setSearchResults.bind(this)} mobile={true}/>
                            <SearchResults
                                results={this.state.searchResults}
                                adminId={this.props.userId}
                                webSocket={this.props.webSocket}
                                changeMemberId={this.changeMemberId.bind(this)}
                                changeVisibility={this.changeAddToChatFormVisibility.bind(this)}
                                onMore={this.setSearchResults.bind(this)}
                                qP={this.state.queruParam}
                            />
                        </div>
                    </Route>
                    <Route path='/chat-list/:name'>
                        <Messenger 
                            chat={this.state.selectedChat}
                            userId={this.props.userId}
                            userName={this.props.userName}
                        />
                    </Route>
                    <Route path='/chat-list'>
                        <ChatList
                            userId={this.props.userId}
                            chatList={this.props.chatList}
                            changeChat={this.changeSelectedChat.bind(this)}
                            mobile={true}
                        />
                    </Route>
                </Switch>
                {this.state.mobileMenu 
                    ?
                    <MobileNav changeTopBar={this.changeTopBar.bind(this)}/>
                    : 
                    ''
                }
            </div>
        )
    }
}

export default Main;