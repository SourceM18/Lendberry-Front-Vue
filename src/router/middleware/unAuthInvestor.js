export default function unAuthInvestor ({ next, store }){
    if(store.getters.Logged_in === true){
        return next({
            name: 'RegistrationInvestor'
        })
    }
    return next()
}