import { useState } from "react";
import { signInWithEmail, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss'
import Button from '../button/button.component'

const defaultForm = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [completeForm, setCompleteForm] = useState(defaultForm);
    const { email, password } = completeForm;

    console.log(completeForm);

    const logGoogleUser = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            console.log("respuesta: ", user);
            if (user) {
                //const regToDb = await createUserDocumentFromAuth(user)

            } else {
                console.error("Cannot sign in user");
            }
        } catch (error) {
            console.error("Exception registering user", error);
        }
    }

    const clearForm = () => {
        setCompleteForm(defaultForm);

    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        console.log(name);
        setCompleteForm({ ...completeForm, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (completeForm.password !== completeForm.password)
            return "password and confirm password different";

        if (email && password) {
            //confirm if it is a valid password
            try {
                const { user } = await signInWithEmail(email, password);
                console.log(`res sign emal:`, user);
                console.log("respuesta: ", user);
                // if (user) {
                //     const regToDb = await createUserDocumentFromAuth(user)
                clearForm();

                // } else {
                //     console.error("Cannot register user");
                // }
            } catch (error) {
                if (error.code == "auth/weak-password") {
                    alert("Password should be at least 6");
                } else if (error.code == 'auth/email-already-in-use') {
                    alert("User already exist");
                } else {
                    console.log(error.message)
                }
            }

        }
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <h3>Sign in with your email and password</h3>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button btnType={'google'} onClick={logGoogleUser} >Sign in with Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;