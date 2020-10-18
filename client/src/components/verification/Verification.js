import React from 'react';
import { Redirect } from 'react-router-dom';
import { compare } from '../../api/verification.api';
import { handleChange } from '../../util/forms';
import SendButton from '../buttons/SendButton/SendButton';

class Verification extends React.Component {
    state = { 
        code: '',
        success: false,
    }

    handleSuccess() {
        this.setState({
            success: true,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        compare({ userId: this.props.userId, code: this.state.code })
            .then(result => {
                if (result.status) this.handleSuccess();
            })
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.success) return <Redirect from='/verification' to='/auth' />;
        
        const failMessage = !this.state.success && 'Wrong code';

        return (
            <form name='verification' className='form-box form-box__visible' onSubmit={e => this.handleSubmit(e)}>
                <h4 className='error'>{failMessage}</h4>
                <label htmlFor="code">
                    <input
                        type="text"
                        name="code"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Code..."
                        required />
                </label>
                <SendButton text="Send" />
            </form>
        );
    }
}

export default Verification;