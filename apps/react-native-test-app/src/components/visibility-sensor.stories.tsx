import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
} from "react-native";

import {
  OptimalAd,
  VisibilitySensor,
  type OptimalAdProps,
} from "@getoptimal/react-native";

const VisibilitySensorTest = (props: OptimalAdProps<ViewProps["style"]>) => {
  const [text, setText] = useState("Idle");

  const [contentShown, setContentShown] = useState(false);
  const handleRefresh = useCallback(() => {
    setContentShown(false);
    setTimeout(() => {
      setContentShown(true);
    }, 100);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.status}>
        <Text style={styles.statusText}>{text}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => handleRefresh()}>
        <View style={styles.refresh}>
          <Text style={styles.statusText}>Refresh</Text>
        </View>
      </TouchableWithoutFeedback>
      {contentShown && (
        <ScrollView style={styles.scroller}>
          <View style={styles.itemContainer}>
            <View style={styles.placeholder}>
              <Text>Placeholder 1</Text>
            </View>
            <View style={styles.placeholder}>
              <Text>Placeholder 2</Text>
            </View>
            <View>
              <VisibilitySensor
                onVisible={() => {
                  setText("Visible");
                }}
                onHidden={(visibleDuration) => {
                  const durationText = visibleDuration
                    ? `, last visible for ${visibleDuration / 1000} seconds`
                    : "";
                  setText(`Hidden${durationText}`);
                }}
              >
                <OptimalAd {...props} containerStyle={styles.ad} />
              </VisibilitySensor>
            </View>
            <View style={styles.placeholder}>
              <Text>Placeholder 3</Text>
            </View>
            <View style={styles.placeholder}>
              <Text>Placeholder 4</Text>
            </View>
            <View style={styles.placeholder}>
              <Text>Placeholder 5</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scroller: {
    marginTop: 50,
  },
  screen: {
    height: "100%",
  },
  container: {
    height: 200,
    borderWidth: 3,
    borderColor: "green",
    backgroundColor: "rgba(100, 100, 220, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "700",
    fontSize: 20,
  },
  placeholder: {
    height: 400,
    borderWidth: 2,
    borderColor: "rgba(120, 120, 120, 0.6)",
    backgroundColor: "rgba(240, 240, 240, 0.8)",
    padding: 10,
    borderRadius: 8,
  },
  status: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "rgba(20, 120, 60, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  refresh: {
    position: "absolute",
    bottom: 10,
    left: 40,
    right: 40,
    height: 60,
    backgroundColor: "rgba(120, 120, 250, 1)",
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  statusText: {
    color: "white",
    fontWeight: "700",
  },
  itemContainer: {
    gap: 10,
  },
  ad: {
    width: "100%",
  },
});

export default {
  title: "Visibility Sensor",
  component: VisibilitySensorTest,
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

export const Default = {};
