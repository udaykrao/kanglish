import React from 'react';
import './Login.css';
interface LoginProps {
    isAngry: boolean;
    onSubmit: (pass: string) => unknown;
};

interface LoginState {
    pass: string;
};

export default class Login extends React.Component<LoginProps, LoginState> {
    public constructor(props: LoginProps) {
        super(props);

        this.state = {
            pass: '',
        };
    }

    public render() {
        const { onSubmit, isAngry } = this.props;
        const { pass } = this.state;
        return (
            <div className={`login-dialog ${isAngry ? 'is-angry' : ''}`}>
                <h2>
                    {
                        isAngry ? <em>Please give the *right* password!</em> : 'Welcome! Please login below'
                    }
                </h2>
                <div className="login-controls">
                    <input
                        type="password"
                        placeholder="Enter your Password..."
                        value={pass}
                        onChange={e => this.setState({ pass: e.target.value })}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                onSubmit(pass);
                            }
                        }}
                    />
                    <button
                        type="button"
                        className={pass.length > 0 ? 'is-ready' : ''}
                        onClick={() => onSubmit(pass)}
                    >
                        Log In
                    </button>
                </div>
            </div>
        )
    }
}