//List of previous journal entries
import { loadEntries } from "@/services/journalServices";
import { JournalEntry } from "@/types/journal";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet, Text, TouchableOpacity, View
} from "react-native";
export default  function JournalHistory(){
    const router=useRouter();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
   useEffect(()=>{
    async function getEntries() {

        try{
            const savedEntries = await loadEntries();
            setEntries(savedEntries);

        }
        catch(error){
            console.log(error);

        }
        finally{
            setIsLoading(false);
        }
        
    }
    getEntries()
   },[])
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Journal History</Text>
            {isLoading ? (<Text>Loading...</Text> ): 
            entries.length===0?
            (<Text>Your journal is waiting for your first entry.</Text>):
            (<FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const preview =
                  item.content.length > 80
                    ? `${item.content.slice(0, 80)}...`
                    : item.content;

                return (
                  <TouchableOpacity  onPress={() => {
                    router.push({ pathname: "/journal",
                                  params: {
                                  entryId: item.id,}})

                                             }}
style={styles.entryCard}>
                    <Text style={styles.entryTitle}>{item.prompt}</Text>
                    <Text>{new Date(item.createdAt).toDateString()}</Text>
                    <Text>{preview}</Text>
                  </TouchableOpacity>
                );
              }}
            />)}
        </View>
    )
}
const styles=StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: "#F7F4EA",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#354735",
    marginBottom: 20,
  },
  entryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#354735",
  },
})