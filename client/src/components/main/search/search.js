import React from 'react';
import { handleChange } from './../../../util/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './search.scss';


class SearchForm extends React.Component {
    state = {}

    handleSubmit(e) {
        e.preventDefault();
        //need write request to api
        this.props.onSearch(['res1']);
    }

    render() {
        return (
            <form name="search" onSubmit={(e) => this.handleSubmit(e)} className="form form_search">
                <div className="form-inner">
                    <div className="row">
                        <input 
                            type="text" 
                            name="searchQ" 
                            onChange={(e) => handleChange(e, this)} 
                            placeholder="Search users..."/>
                        <button className="button button_i button_i-b">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
 
export default SearchForm;