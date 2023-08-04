const password: RegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$ %^&*-]).{8,}$/);

export const RegExUtil = {
    password,
}