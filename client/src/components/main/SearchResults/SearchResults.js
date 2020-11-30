import React from 'react';
import Result from './Result/Result';
import SendButton from './../../buttons/SendButton/SendButton';

import './searchResults.scss'
import { search } from '../../../api/user.api';

let offset = 15;
let countClick = 1;

const onMore = (onMore, queryParam, currentResults) => {
    search(queryParam, offset * countClick)
        .then(result => {
            if (result.data) {
                onMore(currentResults.concat(result.data));
            }
        })
        countClick++;
} 

export default props => {
    const results = props.results;
    return (
        <div className="results">
            <ul className="results-list">
                {
                    results.map(result => {
                        return <Result 
                                    key={result.id} 
                                    adminId={props.adminId}
                                    userId={result.id}
                                    name={result.name} 
                                    avatar={result.avatar_image} 
                                    webSocket={props.webSocket}
                                    changeMemberId={props.changeMemberId}
                                    changeVisibility={props.changeVisibility}
                                    />
                    })
                }
                <li>
                    {results.length
                        ? <SendButton 
                                text='More' 
                                onClick={() => onMore(props.onMore, props.qP, results)}/>
                        : ''
                    }
                </li>
            </ul>
        </div>
    );
}