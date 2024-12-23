export class User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    confirmPassword?: string;
    reportsTo?: Array<{ reportToId: number, reportToName: string }> = [];
    roles?: Array<{ roleId: number, roleName: string, code: string }> = [];
    plantId: number;
    departmentId: number;
   // plants: { plantId: number; plantName: string }[]; // Add this property
    jobRole?: string;
    workArea?: string;
    reportingManager?: string;
    shift: string;
    workingDays?: number;
    
}

export class BrowserUser {
    '.expires': Date;
    '.issued': Date;
    access_token: string;
    expires_in: number;
    permissions: string;
    token_type: string;
    tokenId: string;
    user: string;
}

export class LoginUser {
    email: string;
    password: string;
}

