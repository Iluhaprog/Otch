import React from 'react';
import { handleChange } from './../../../util/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../../api/user.api';
import { withRouter } from 'react-router-dom';

import './search.scss';


class SearchForm extends React.Component {
    state = {
        searchQ: ''
    }

    
    handleSubmit(e) {
        e.preventDefault();
        search(this.state.searchQ)
        .then(result => {
            if (result.data) {
                    this.props.history.push('/search')
                    this.props.onSearch(result.data);
                }
            });
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
 
export default withRouter(SearchForm);