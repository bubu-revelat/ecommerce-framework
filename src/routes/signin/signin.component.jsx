import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up-form.component"

const Signin = () => {
    const logGoogleUser = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            console.log("respuesta: ", user);
            if (user) {
                const regToDb = await createUserDocumentFromAuth(user)

            } else {
                console.error("Cannot register user");
            }
        } catch (error) {
            console.error("Exception registering user", error);
        }
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>

            <SignUpForm/>
        </div>
    )
}

export default Signin;