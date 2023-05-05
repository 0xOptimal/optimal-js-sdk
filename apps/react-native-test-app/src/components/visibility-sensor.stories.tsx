import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { VisibilitySensor } from "@getoptimal/react-native";

const VisibilitySensorTest = () => {
  const [text, setText] = useState("Idle");

  return (
    <View>
      <View style={styles.status}>
        <Text style={styles.statusText}>{text}</Text>
      </View>
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
              <View style={styles.container}>
                <Text style={styles.text}>This area is being tracked</Text>
              </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  scroller: {
    marginTop: 50,
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
  statusText: {
    color: "white",
    fontWeight: "700",
  },
  itemContainer: {
    gap: 10,
  },
});

export default {
  title: "Visibility Sensor",
  component: VisibilitySensorTest,
};

export const Default = {};
