import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Button,
  Center,
  Container,
  FileButton,
  Group,
  List,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import Script from "next/script";
import { useEffect, useState } from "react";
import Debugger from "src/common/components/elements/debugger";
import Layout from "src/common/components/layouts/layout";
type Props = {};

export default function Files({}: Props) {
  const [showFiles, setShowFiles] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "demo",
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image("front_face");

  useEffect(() => {
    console.log({ files });
  }, [files]);

  return (
    <Layout>
      <Script
        type="text/javascript"
        src="https://upload-widget.cloudinary.com/global/all.js"
      />
      {!showFiles ? (
        <Center sx={{ minHeight: "calc(100vh - 40px)" }}>
          <Group align="center">
            <PasswordInput sx={{ width: 300 }} placeholder="Password" />
            <Button onClick={() => setShowFiles(true)}>Open</Button>
          </Group>
        </Center>
      ) : (
        <Container>
          <Title>Files</Title>
          <Debugger data={files} />
          <AdvancedImage cldImg={myImage} />
          <Paper p="md">
            <FileButton
              onChange={setFiles}
              accept="image/png,image/jpeg"
              multiple
            >
              {(props) => <Button {...props}>Upload new image</Button>}
            </FileButton>
          </Paper>

          {files.length > 0 && (
            <Text size="sm" mt="sm">
              Picked files:
            </Text>
          )}

          <List size="sm" mt={5} withPadding>
            {files.map((file, index) => (
              <List.Item key={index}>{file.name}</List.Item>
            ))}
          </List>
        </Container>
      )}
    </Layout>
  );
}
