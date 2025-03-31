interface Company {
    name: string
    dateIncorporated: string
    description?: string
    totalEmployees: number
    address: Address
}

export type { Company }

interface Address {
    street: string
    city: string
    postcode: string
}