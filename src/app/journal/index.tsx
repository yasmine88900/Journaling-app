import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-reanimated/lib/typescript/Animated";
export default function JournalScreen(){
    const [entry, setEntry] = useState("");
    const router = useRouter();
    return(
        <View style={styles.container}>
       
            <Text>My Journal</Text>
           <Text>{new Date().toDateString()}</Text>
           <Text>Hello!</Text>
           <Text>What is one thing you're grateful for today?</Text>
           <TextInput
           placeholder="write you thoughts here.."  multiline value={entry} onChangeText={setEntry}></TextInput>
           <TouchableOpacity onPress={()=>alert(entry)}>
           <Text> Save Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.back()}>
             <Text> Back to Dashboard</Text>
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
})