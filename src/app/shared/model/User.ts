export interface User {
    id: string;
    email: string | null;
    name: {
        firstname: string;
        lastname: string;
    }
    isAdmin:boolean
}
