import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/authContext";

export const AuthPage = () => {
    const [form, setForm] = useState({email: '', password: ''});
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);

    useEffect(() => {
        message(error);
        clearError();
    }, [error,clearError,message])

    useEffect(()=>{
        window.M.updateTextFields();
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('./api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('./api/auth/login', 'POST', {...form});
            auth.login(data.token,data.userId);
        } catch (e) {
        }
    }

    return (
        <div className={'row'}>
            <div className="col s6 offset-s3">
                <h1>Compress the link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>
                            <div className="input-field white-text">
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className='white-text'>Email</label>
                            </div>
                            <div className="input-field white-text">
                                <input
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password" className='white-text'>Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 hoverable" style={{marginRight: 10}}
                                disabled={loading} onClick={loginHandler}>Log in
                        </button>
                        <button className="btn grey lighten-1 black-text hoverable" onClick={registerHandler}
                                disabled={loading}>Sign up
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
