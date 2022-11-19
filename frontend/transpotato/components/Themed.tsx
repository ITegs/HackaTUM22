/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  SafeAreaView as DefaultSafeAreaView,
  ScrollView as DefaultScrollView,
  Button as DefaultButton,
} from "react-native";

import Colors from "../constants/Theme";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type CardProps = ThemeProps & DefaultView["props"] & { size: number };
export type ButtonProps = ThemeProps & DefaultButton["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Card(props: CardProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );
  const borderRadius = 30;
  const alignSelf = props.size != 1 ? "center" : "flex-start";
  const width = props.size === 2 ? "95%" : "40%";
  const padding = 20;
  const justifyContent = "center";
  const marginTop = props.size === 2 ? 20 : 0;
  const alignItems = "center";

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          borderRadius,
          alignSelf,
          width,
          padding,
          justifyContent,
          marginTop,
          alignItems,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "button"
  );

  return <DefaultButton color={backgroundColor} {...otherProps} />;
}
