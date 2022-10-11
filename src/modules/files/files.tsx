/* eslint-disable jsx-a11y/alt-text */
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Button,
  Center,
  Container,
  FileButton,
  Group,
  Image,
  List,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import Script from "next/script";
import { useState } from "react";
import Debugger from "src/common/components/elements/debugger";
import Layout from "src/common/components/layouts/layout";
import useMediaUploader from "src/common/hooks/useMediaUploader";
type Props = {};
const cld = new Cloudinary({
  cloud: {
    cloudName: "dbgdwtymv",
    apiKey: "376611955955996",
    apiSecret: "zpZxeItunXsLAGRJjamZ7rAt-Tk",
  },
});
export default function Files({}: Props) {
  const [showFiles, setShowFiles] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { upload, media, isLoading } = useMediaUploader({ files });

  // Create and configure your Cloudinary instance.

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image("front_face");

  return (
    <Layout>
      <LoadingOverlay visible={isLoading} />
      <Script
        type="text/javascript"
        src="https://upload-widget.cloudinary.com/global/all.js"
      />
      {!showFiles ? (
        <Center sx={{ minHeight: "calc(100vh - 40px)" }}>
          <Group align="center">
            <PasswordInput sx={{ width: 300 }} placeholder="Password" />
            <Button>Open</Button>
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

          {media?.map((img, index) => (
            <Image src={img} key={index} />
          ))}

          <List size="sm" mt={5} withPadding>
            {files.map((file, index) => (
              <List.Item key={index}>{file.name}</List.Item>
            ))}
          </List>

          <Button onClick={upload} loading={isLoading}>
            Upload
          </Button>
        </Container>
      )}
    </Layout>
  );
}
