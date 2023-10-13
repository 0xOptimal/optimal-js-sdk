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
        {tab === "1" && (
          <View>
            <Text>Go to tab 2 for content</Text>
          </View>
        )}
        {tab === "2" && <OptimalAd {...props} />}
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
      publisher: "test-publisher",
      adTypes: ["sq-img-text-box"],
      viewerData: {
        wallets: [
          "1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          "1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        ],
      },
    },
    renderLoading: () => <Text>Loading...</Text>,
  },
};
