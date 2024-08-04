import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./script/Welcome";
import SignIn from "./script/Regist";
import Log from "./script/Login";
import SQL_datos from "./script/SQL";


const Stack = createNativeStackNavigator();

function MyStack() {
  return ( 
    <Stack.Navigator>
      
      
      
      <Stack.Screen
        name="Log"
        component={Log}
        options={{
          title: "Log-In",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#3b5998" }
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Sign Up",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#3b5998" },
          headerTitleStyle: { color: "white" }
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Panel De Control",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#525fe1" }
        }}
      />
      <Stack.Screen
      name="datos"
      component={SQL_datos}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer> 
  );
}
