export default {
    name: value => /^[a-zA-Zа-яА-Я]+$/.test(value),
    email: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
    password: value => /^[A-Za-z\d]\w{7,14}$/.test(value),
    accountName: value => /^.{3,12}$/.test(value),
    bankCardOwner: value => /^[a-zA-Z]{2,}[ ][a-zA-Z]{2,}$/.test(value),
    bankCardCvv: value => /^\d{3}$/.test(value),
    bankCardNumber: value => /^\d{16}$/.test(value),
    bankCardAmount: value => /^\d{1,10}$/.test(value),
}