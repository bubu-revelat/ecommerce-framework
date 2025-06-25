import { useState } from "react";
import {signInWithEmail, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.style.scss'
import Button from '../button/button.component'

const defaultForm = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword: ''
}

const SignUpForm = ()=>{

    const [completeForm, setCompleteForm] = useState(defaultForm);
    const {displayName, email, password, confirmPassword} = completeForm;

    console.log(completeForm);

    const clearForm = ()=>{
        setCompleteForm(defaultForm);

    }

    const handleChange = (e)=>{
        
        const {name, value} = e.target;
        console.log(name);
        setCompleteForm({...completeForm, [name]: value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(completeForm.password !== completeForm.password)
            return "password and confirm password different";

        if(email && password && displayName){
            //confirm if it is a valid password
            try{
                const {user} = await signInWithEmail(email,password);
                console.log(`res sign emal:`, user);
                console.log("respuesta: ", user);
                            if (user) {
                                const regToDb = await createUserDocumentFromAuth(user, {displayName})
                                clearForm();
                
                            } else {
                                console.error("Cannot register user");
                            }
            }catch(error){
                if(error.code == "auth/weak-password"){
                    alert("Password should be at least 6");
                }else if(error.code == 'auth/email-already-in-use'){
                    alert("User already exist");
                }else{
                    console.log(error.message)
                }
            }
            
        }
    }

 return(
    <div className="sigm-up-container">
        <h2>Don't have an account?</h2>

        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>

            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <Button type="submit">Sign Up</Button>
        </form>
    </div>
 )  
}

export default SignUpForm;