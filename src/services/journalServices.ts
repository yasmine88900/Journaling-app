//Handles saving, retrieving, and updating entries
import { JournalEntry } from "@/types/journal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveEntries(entries: JournalEntry[]){
    await AsyncStorage.setItem("journalEntries",JSON.stringify(entries));
}
export async function loadEntries():Promise<JournalEntry[]>{
     const savedEntries = await AsyncStorage.getItem("journalEntries");
     return savedEntries? JSON.parse(savedEntries):[];
}