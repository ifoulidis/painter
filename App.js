// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./components/AuthContext.js";
import LoginScreen from "./components/LoginScreen.js";
import RegisterScreen from "./components/RegisterScreen.js";
import QuoteScreen from "./components/QuoteScreen.js";
import PaintEstimateScreen from "./components/PaintEstimateScreen.js";
import AuthenticatedApp from "./components/AuthenticatedApp.js";
import EstimateByFPAScreen from "./components/EstimateByFPAScreen.js";

const Stack = createStackNavigator();

const App = () => {
  const { user } = useAuth();
  console.log("User in App:", user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Dashboard" component={AuthenticatedApp} />
            <Stack.Screen
              name="Paint Estimate Screen"
              component={PaintEstimateScreen}
            />
            <Stack.Screen name="QuoteScreen" component={QuoteScreen} />
            <Stack.Screen
              name="Estimate By FPA Screen"
              component={EstimateByFPAScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
