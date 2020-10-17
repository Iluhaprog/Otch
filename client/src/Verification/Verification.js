import React from 'react';
import { handleChange } from './../util/forms';

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const body = {
            'userId': '18',
            'code': this.state.code,
        };
        fetch('https://localhost:3000/verification/compare', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(err => console.error(err))
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