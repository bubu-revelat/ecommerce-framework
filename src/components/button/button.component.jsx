import './button.styles.scss'

const BTN_TYPE = {
    google:'google-sign-in',
    inverted:'inverted'
}


const Button = ({children, btnType, ...otherProps})=>{
    return(
        <button className={`button-container ${BTN_TYPE[btnType]}`} {...otherProps}>{children}</button>
    )
}

export default Button;