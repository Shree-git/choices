export interface User {
    userUID: string;
    firstName: string;
    lastName:string;
    email: string;
    emailVerified: boolean;

    
    isAdmin?: boolean;
    isAgent?: boolean;
    photoURL?: string;
    phoneNumber?: string;

}