//Defines the TypeScript structure of a journal entry

export type JournalEntry = {
    id: string;
    content:string;
    createdAt:string;
    updatedAt:string;
    prompt:string;
    theme?: string; //?:choice
    font?: string;
    emoji?: string;
    image?: string | null;

};