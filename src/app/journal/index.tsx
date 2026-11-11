import prompts from "@/data/prompts";
import { loadEntries, saveEntries } from "@/services/journalServices";
import { JournalEntry } from "@/types/journal";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { JournalEmojis, JournalFonts, JournalThemes } from "@/constants/journalCustomization";
export default function JournalScreen(){
    const [entry, setEntry] = useState("");

    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedFont, setSelectedFont] = useState("normal");
    const [selectedEmoji, setSelectedEmoji] = useState("");
     const [entries, setEntries] =  useState<JournalEntry[]>([]);

     const [isSaving, setIsSaving] = useState(false);
     const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
     const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const router = useRouter();
    const { entryId } = useLocalSearchParams<{ entryId?: string }>();
   
    
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
     let promptIndex = 0;
      if (prompts.length === 0) {
      
}
else{
   promptIndex = dayOfYear % prompts.length;
}
    const [dailyPrompt, setDailyPrompt] = useState(
  prompts[promptIndex] || "No writing prompt available today. Write about anything on your mind."
);
 useEffect(()=>{
  async function getEntries() {
    try{
   const savedEntries =
    await loadEntries();
      setEntries(savedEntries);
      const selectedEntry = savedEntries.find(
     (item) => item.id === entryId
);
const selectedIndex=
savedEntries.findIndex((item)=>item.id===entryId);
if (selectedEntry && selectedIndex !== -1) {
  setEntry(selectedEntry.content);
  setEditingIndex(selectedIndex);
  setSelectedEmoji(selectedEntry.emoji ?? "");
  setSelectedFont(selectedEntry.font ?? "");
  setSelectedTheme(selectedEntry.theme ?? "");
  
}
}
  catch(error){
    Alert.alert(String(error))
  }
  finally{
      console.log("Loading finished");
  }

  }
  getEntries();

 },[entryId])
    return(
        <View style={styles.container}>
       
            <Text style={styles.title}>My Journal 🌿</Text>
            <TouchableOpacity style={styles.historyButton} onPress={() => router.push("/journal/history")}>
               <Text style={styles.historyText}>View Journal History</Text>
              </TouchableOpacity>
           <Text style={styles.date}>{new Date().toDateString()}</Text>
           <Text style={styles.greeting}>Hello!</Text>
           <Text >{dailyPrompt}</Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            {JournalEmojis.map((emoji)=>(
              <TouchableOpacity key={emoji}
              onPress={()=>setSelectedEmoji(emoji)}>
                 <Text>{emoji}</Text>
                 
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {Object.entries(JournalThemes).map(([theme,color])=>(<TouchableOpacity
            
             key={theme}
            onPress={() => setSelectedTheme(theme)}
           style={{
        backgroundColor: color,
        width: 35,
        height: 35,
        borderRadius: 20,
      }}>
              
            </TouchableOpacity>))}
          </View>
          {selectedEmoji !=="" &&(<Text>
            {selectedEmoji}
          </Text>)}
           
           <TextInput style={[styles.input, { fontFamily: selectedFont ,backgroundColor: JournalThemes[selectedTheme as keyof typeof JournalThemes]}]}
           
           placeholder="write you thoughts here.."  multiline value={entry} onChangeText={(text)=>{setEntry(text) ;
            setHasUnsavedChanges(true)}
           }></TextInput>
           <View style={{ flexDirection: "row", gap: 10 }}>
             {JournalFonts.map((font) => (
               <TouchableOpacity
                 key={font}
                onPress={() => setSelectedFont(font)}
    >
                  <Text>{font}</Text>
                  </TouchableOpacity>
  ))}
</View>
           

           <TouchableOpacity style={styles.saveButton} disabled={isSaving} onPress={async()=> {
  if (isSaving) return;
   
    {if(entry.trim()===""){
            alert("Enter a valid message")
           }
           else{
            setIsSaving(true);
            let updatedEntries:JournalEntry[]
              if(editingIndex!==null){
             updatedEntries=entries.map((item,index)=>index===editingIndex?{
              ...item,
        content: entry,
        updatedAt: new Date().toISOString(),
        emoji: selectedEmoji,
        font:selectedFont,
        theme:selectedTheme,
             }:item)
             
  } 
  else{ 
    
     const newEntry: JournalEntry = {
          id: Date.now().toString(),
          content: entry,
          prompt: dailyPrompt,
         createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emoji: selectedEmoji,
        font:selectedFont,
        theme:selectedTheme,
     };
     updatedEntries=[...entries,newEntry]}
            
  
            try{
              await saveEntries(updatedEntries);
               setEntries(updatedEntries);
              setHasUnsavedChanges(false);

            }
            catch (error) {
          Alert.alert("Error", "Could not save your entry. Please try again.");
                }         
                 finally {
  setIsSaving(false);
           }
            setHasUnsavedChanges(false);
           
           
           } }}}>
         
           <Text style={styles.saveText}>{isSaving ? `Saving..`:`Save Entry`}</Text>
            </TouchableOpacity>

            
            <TouchableOpacity  style={styles.backButton}onPress={()=>{
              if(hasUnsavedChanges){
               Alert.alert(  "Unsaved changes",
                              "Do you want to leave without saving?",)//add choices to save or cancel later

              }else{router.back()}}}>
             <Text style={styles.backText}> Back to Dashboard</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles=StyleSheet.create({
     container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F7F4EA",
  },
  
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#354735",
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    color: "#7B806F",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#354735",
    marginBottom: 12,
  },

  prompt: {
    fontSize: 16,
    color: "#596650",
    marginBottom: 16,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D5DDCA",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#354735",
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: "#8A9A78",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    padding: 12,
    alignItems: "center",
  },

  backText: {
    color: "#596650",
    fontSize: 15,
  },
  historyButton: {
  backgroundColor: "#8A9A78",
  padding: 12,
  borderRadius: 10,
  alignItems: "center",
  marginVertical: 12,
},
historyText: {
  color: "#FFFFFF",
  fontWeight: "600",
},
})