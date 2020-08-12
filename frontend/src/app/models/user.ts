interface Cost {
    name: string,
    value: number,
    payDate: Date,
    dueDate: Date,
    accountRepeat: number
}
export interface User {
    name: string,
    email: string,
    password: string,
    age: number,
    gender: string,
    profileImage: any,
    status: string,
    costs: [Cost]
}