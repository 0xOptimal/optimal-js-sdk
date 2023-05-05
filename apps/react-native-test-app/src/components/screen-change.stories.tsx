import { useState, type ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type TouchableWithoutFeedbackProps,
} from "react-native";

import { OptimalAd, type OptimalAdProps } from "@getoptimal/react-native";

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    gap: 20,
  },
  button: {
    backgroundColor: "rgba(30, 170, 0, 0.3)",
    padding: 10,
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "rgba(30, 170, 0, 0.6)",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  tabContainer: {
    paddingTop: 20,
  },
});

const Button = ({
  isActive,
  children,
  onPress,
}: {
  isActive?: boolean;
  children: ReactNode;
  onPress?: TouchableWithoutFeedbackProps["onPress"];
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, isActive && styles.buttonActive]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ScreenChangeTest = (props: OptimalAdProps) => {
  const [tab, selectTab] = useState<"1" | "2">("1");
  return (
    <View>
      <View style={styles.tabsContainer}>
        <Button onPress={() => selectTab("1")} isActive={tab === "1"}>
          Tab 1
        </Button>
        <Button onPress={() => selectTab("2")} isActive={tab === "2"}>
          Tab 2
        </Button>
      </View>
      <View style={styles.tabContainer}>
        {tab === "1" && <OptimalAd {...props} />}
        {tab === "2" && (
          <View>
            <Text>Nothing to see here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default {
  title: "Screen Change",
  component: ScreenChangeTest,
};

export const Default = {
  args: {
    opts: {
      publisher: "templewallet",
      adType: "tw-fullview",
      viewerData: {
        wallets: ["1:0x31AC3823d91A7B66CE0F4087d9a1D4A76300fA72"],
      },
    },
    renderLoading: () => <Text>Loading...</Text>,
  },
};
