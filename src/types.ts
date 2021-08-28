export interface iContact {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface iCard {
    id: string,
    type: 'card'
    name: string,
    number: string,
    expiryDate: string
}

export interface iBankAccount {
    id: string,
    type: 'account',
    name: string,
    number: string,
    bsb: string
}

export type iMethod = iCard | iBankAccount;


export enum Transitions {
    slideLeft = 'slide-left',
    slideRight = 'slide-right',
    none = ''
}
