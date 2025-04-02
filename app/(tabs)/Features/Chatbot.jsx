import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
// import sendMessageToChatbot from "./chatService"; // API call function
import { LinearGradient } from "expo-linear-gradient";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        const botResponse = await sendMessageToChatbot(input);
        setMessages((prev) => [...prev, userMessage, { text: botResponse, sender: "bot" }]);

        setInput("");
        input="";
    };

    return (
        <LinearGradient colors={["#003973", "#0056b3"]} style={{ flex: 1, padding: 20 }}>
            <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={{
                                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                backgroundColor: msg.sender === "user" ? "#00A86B" : "#E5E5BE",
                                padding: 12,
                                borderRadius: 12,
                                marginVertical: 5,
                                maxWidth: "80%",
                            }}
                        >
                            <Text style={{ color: msg.sender === "user" ? "#FFF" : "#000", fontSize: 16 }}>
                                {msg.text}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Chat Input Section */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#E5E5BE",
                        borderRadius: 25,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                    }}
                >
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type a message..."
                        placeholderTextColor="#333"
                        style={{ flex: 1, fontSize: 16, color: "#000" }}
                    />
                    <TouchableOpacity onPress={handleSend}>
                        <Ionicons name="send" size={24} color="#007BFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default ChatScreen;
