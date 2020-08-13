interface Cost {
    name: string,
    value: number,
    payDate: string,
    dueDate: string,
    accountRepeat: number
}
export interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    gender: string,
    profileImage: any,
    status: string,
    costs: [Cost]
}