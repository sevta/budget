import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

type Props = {};

export default function useDarkMode() {
  const [value, setValue] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  function toggleDarkMode() {
    setValue((current) => (current === "dark" ? "light" : "dark"));
  }

  return {
    value,
    toggleDarkMode,
  };
}
