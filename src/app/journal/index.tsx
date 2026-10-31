
import { JournalEntry } from "@/types/journal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
export default function JournalScreen(){
    const [entry, setEntry] = useState("");
     const [entries, setEntries] =  useState<JournalEntry[]>([]);
     const [isSaving, setIsSaving] = useState(false);
     const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
     const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const router = useRouter();
    
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
  async function loadEntries() {
    try{
   const savedEntries= await AsyncStorage.getItem("journalEntries")
  setEntries(savedEntries ? JSON.parse(savedEntries) : [])}
  catch(error){
    Alert.alert(String(error))
  }
  finally{
      console.log("Loading finished");
  }

  }
  loadEntries();

 },[])
    return(
        <View style={styles.container}>
       
            <Text style={styles.title}>My Journal 🌿</Text>
           <Text style={styles.date}>{new Date().toDateString()}</Text>
           <Text style={styles.greeting}>Hello!</Text>
           <Text >{dailyPrompt}
           </Text>
           <TextInput style={styles.input}
           placeholder="write you thoughts here.."  multiline value={entry} onChangeText={(text)=>{setEntry(text) ;
            setHasUnsavedChanges(true)}
           }></TextInput>

           <TouchableOpacity style={styles.saveButton} disabled={isSaving} onPress={async()=>{if(entry.trim()===""){
            alert("Enter a valid message")
           }
           else{
            setIsSaving(true);
            let updatedEntries
              if(editingIndex!==null){
             updatedEntries=entries.map((item,index)=>index===editingIndex?entry:item)
             
  } 
  else{ updatedEntries=[...entries,entry]}
             setEntries(updatedEntries);
            await AsyncStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
            setHasUnsavedChanges(false);
           
            setTimeout(()=>{
              setIsSaving(false);
              setEntry("");
              setEditingIndex(null)
              setHasUnsavedChanges(false)
              alert("Entry Saved successfully")
            },1000)
           } }}>
         
          
            

           <Text style={styles.saveText}>{isSaving ? `Saving..`:`Save Entry`}</Text>
            </TouchableOpacity>
            {entries.map((item,index)=>
            <Text key={index}> <TouchableOpacity onPress={() => {setEntry(item);setEditingIndex(index)}}> <Text>{item}</Text></TouchableOpacity></Text>)}
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
  }
})