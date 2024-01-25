export const formValidation = ({email , username , password , confirm , check})=>{

    const errorMessages  = {}

        if(!email){
            errorMessages.emailError = 'waiting for the email !'
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
             errorMessages.emailError = "email is not valid yet"
        }else{
            delete errorMessages.emailError
        }

        if(!username){
            errorMessages.usernameError = "waiting for the userName !"
        }else if(Array.from(username).length < 3){
            errorMessages.usernameError = "at least 3 character"
        }else{
            delete errorMessages.usernameError
        }


        if(!password){
            errorMessages.passwordError = "Enter password !"
        }else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(password)){
            errorMessages.passwordError = "use one Upper case and one special Character"
        }else{
            delete errorMessages.passwordError
        }


        if(!confirm){
            errorMessages.confirmError = "waiting for the confirmation"
        }else if(password !== confirm){
            errorMessages.confirmError = "password doesn't match yet"
        }else{
            delete errorMessages.confirmError
        }

        if(!check){
            errorMessages.check = 'pleaase accept our terms and conditions'
        }else{
            delete errorMessages.check
        }

        return errorMessages
}