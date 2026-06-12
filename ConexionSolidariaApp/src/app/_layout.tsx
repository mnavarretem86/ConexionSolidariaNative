// src/app/_layout.tsx
import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />

        <Toast
          position="top"
          topOffset={60}
          config={{
            success: (props) => (
              <View
                style={{
                  width: "92%",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  backgroundColor: "#0066FF",
                  alignSelf: "center",
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {props.text1}
                </Text>

                {props.text2 && (
                  <Text
                    style={{
                      color: "#e0e7ff",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {props.text2}
                  </Text>
                )}
              </View>
            ),

            error: (props) => (
              <View
                style={{
                  width: "92%",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  backgroundColor: "#ef4444",
                  alignSelf: "center",
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {props.text1}
                </Text>

                {props.text2 && (
                  <Text
                    style={{
                      color: "#fee2e2",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {props.text2}
                  </Text>
                )}
              </View>
            ),
          }}
        />
      </>
    </AuthProvider>
  );
}