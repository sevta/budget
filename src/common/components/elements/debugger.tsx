import { Code, Paper, PaperProps } from "@mantine/core";

type Props = {
  data: any;
} & PaperProps;

export default function Debugger({ data, ...props }: Props) {
  return (
    <Paper p="md" {...props}>
      <pre>
        <Code block>{JSON.stringify(data, null, 2)}</Code>
      </pre>
    </Paper>
  );
}
