export default {
    name: value => /^[a-zA-Zа-яА-Я]+$/.test(value),
    email: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
    password: value => /^[A-Za-z\d]\w{7,14}$/.test(value),
    accountName: value => /^.{3,12}$/.test(value),
}