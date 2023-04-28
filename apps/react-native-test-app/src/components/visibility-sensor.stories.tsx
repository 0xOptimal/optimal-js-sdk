import { useState, type FC, type ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

import { VisibilitySensor } from "@getoptimal/react-native";

const VisibilitySensorTest = () => {
  const [text, setText] = useState("Idle");

  return (
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
      <View
        style={{
          height: 200,
          borderWidth: 1,
          borderColor: "green",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{text}</Text>
      </View>
    </VisibilitySensor>
  );
};

export default {
  title: "Visibility Sensor",
  component: VisibilitySensorTest,
};

export const Default = {
  decorators: [
    (Story) => (
      <ScrollView>
        <View
          style={{
            height: 400,
            borderWidth: 1,
          }}
        >
          <Text>Placeholder 1</Text>
        </View>
        <View
          style={{
            height: 400,
            borderWidth: 1,
          }}
        >
          <Text>Placeholder 2</Text>
        </View>
        <Story />
        <View
          style={{
            height: 400,
            borderWidth: 1,
          }}
        >
          <Text>Placeholder 3</Text>
        </View>
        <View
          style={{
            height: 400,
            borderWidth: 1,
          }}
        >
          <Text>Placeholder 4</Text>
        </View>
        <View
          style={{
            height: 400,
            borderWidth: 1,
          }}
        >
          <Text>Placeholder 5</Text>
        </View>
      </ScrollView>
    ),
  ] as ((Story: FC) => ReactNode)[],
};
