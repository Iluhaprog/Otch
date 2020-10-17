import React from 'react';
import { GET } from '../../util/api';
import { handleChange } from '../../util/forms';

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form name='verification' onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="code">
                    <input 
                        type="text" 
                        name="code" 
                        className="form-box__item" 
                        placeholder="Code..."
                        onChange={(e) => handleChange(e, this)}
                        required
                    />
                </label>
                <button className="button button_send">
                    OK
                </button>
            </form>
        )
    }
}

export { Verification }