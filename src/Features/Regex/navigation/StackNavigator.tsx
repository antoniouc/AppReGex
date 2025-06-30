import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { StackParamList } from "./NavigationTypes";
import {RegexTesterScreen} from "../presentation/components/templates/regexTestForm";
import HistorialScreen from "../presentation/components/templates/Regexhistory";
import RegexRailScreen from "../presentation/components/templates/RegexRailDiagram";

const Stack = createNativeStackNavigator<StackParamList>();

export default function RegexStackNavigator() {
    return(
        <Stack.Navigator initialRouteName="RegexHome">
            <Stack.Screen 
                name="RegexHome" 
                component={RegexTesterScreen} 
                options={{ title: "Probador de Regex" }} 
            />
            <Stack.Screen 
                name="RegexHistory" 
                component={HistorialScreen} 
                options={{ title: "Historial de Regex" }} 
            />
            <Stack.Screen 
                name="RegexDiagram" 
                component={RegexRailScreen} 
                options={{ title: "Diagrama de RailRoad" }}
            />
        </Stack.Navigator>
    )
}