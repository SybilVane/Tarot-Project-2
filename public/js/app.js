const printInfo = info => {
    const { username, firsName, age } = info[0]

    document.querySelector('#result').innerHTML = text
}

const printError = name => {
    document.querySelector('#result').innerHTML = `<span style="color: red">The user does not exist</span>`
}

const getCountryInfo = name => {
    axios
        .get()
        .then(response => printInfo(response.data))
        .catch(err => printError(name))

}
document.querySelector('#username').onkeyup = () => {
    const userValue = document.querySelector('#username').value
    getCountryInfo(userValue)
}