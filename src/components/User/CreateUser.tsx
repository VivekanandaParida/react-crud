import React, { useState, ChangeEvent } from "react";
import { IRegisterUser } from "../../interfaces/IRegisterUser";
import { userService } from "../../Api/user.services";


const CreateUser: React.FC<any> = ({ onDataSubmit }:any) => {
    const initialUser: IRegisterUser = {
        mobile: '',
        password: ''
        
    }
    const [User, setUser] = useState<IRegisterUser>(initialUser);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });
    };

    const saveUser = () => {
        var data = {
            mobile: User.mobile,
            password: User.password,
            createdOn: new Date()
            
        };
        onDataSubmit(data);
    };

    const newUser = () => {
        setUser(initialUser);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="email">Mobile</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={User.mobile}
                            onChange={handleInputChange}
                            name="mobile"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={User.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>

                    <button onClick={saveUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateUser;
