module.exports = {  
    isLogged: (user) => {
        return user != undefined
    },
    isADMIN: (user) => {
        return user === 'ADMIN'
    }

}