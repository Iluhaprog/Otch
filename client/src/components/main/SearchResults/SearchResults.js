import React from 'react';
import Result from './Result/Result';

import './searchResults.scss'

export default props => {
    return (
        <div className="results">
            <ul className="results-list">
                {
                    props.results.map(result => {
                        return <Result key={result.id} name={result.name} avatar={result.avatar_image} />
                    })
                }
            </ul>
        </div>
    );
}