export default function unAuthBorrower ({ next, store }){
    if(store.getters.Logged_in === true){
        return next({
            name: 'RegistrationBorrower'
        })
    }
    return next()
}