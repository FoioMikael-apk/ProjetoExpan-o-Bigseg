import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.navbar, { paddingBottom: insets.bottom }]}> 
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
     
    color:"white",
    
    
  },
  content: {
    flex: 1,
    
    color:"white", 
  },
  navbar: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    backgroundColor: "#fff",
   
  },
});
