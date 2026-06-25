

export  interface searchInput {
    city: string;
}

export interface searchOutput {
    city: string;
    temperature: number;
    description: string;
    icon: string;
}

export interface searchError {
    message: string;
}