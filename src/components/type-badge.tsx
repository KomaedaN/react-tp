import { Text, StyleSheet } from "react-native";
import { TYPE_COLORS } from "./type-color";

export function TypeBadge({ type }: { type: string }) {
  return (
    <Text
      style={[
        styles.badge,
        { backgroundColor: TYPE_COLORS[type] ?? TYPE_COLORS.unknown },
      ]}
    >
      {type}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
    color: "#fff",
    fontSize: 11,
    textTransform: "capitalize",
  },
});
