import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import prompts from "@/data/prompts";
import { useRouter } from "expo-router";
import { useState } from "react";
export default function JournalScreen(){
    const [entry, setEntry] = useState("");
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
    return(
        <View style={styles.container}>
       
            <Text style={styles.title}>My Journal 🌿</Text>
           <Text style={styles.date}>{new Date().toDateString()}</Text>
           <Text style={styles.greeting}>Hello!</Text>
           <Text >{dailyPrompt}
           </Text>
           <TextInput style={styles.input}
           placeholder="write you thoughts here.."  multiline value={entry} onChangeText={setEntry}></TextInput>
           <TouchableOpacity style={styles.saveButton} onPress={()=>alert(entry)}>
           <Text style={styles.saveText}> Save Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.backButton}onPress={()=>router.back()}>
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