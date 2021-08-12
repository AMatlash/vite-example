export interface iContact {
    firstName: string,
    lastName: string,
    email: string
}

export interface iCard {
    type: 'card'
    name: string,
    number: string,
    expiryDate: Date
}

export interface iBankAccount {
    type: 'account'
    name: string,
    number: string,
    bsb: string
}

export type iMethod = iCard | iBankAccount;
