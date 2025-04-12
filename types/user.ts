declare global {
    interface User {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null;
        global_name?: string | null;
    }
}