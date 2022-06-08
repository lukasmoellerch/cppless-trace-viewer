import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import React from "react";

const stylesServer = createStylesServer();

export default class _Document extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="x">
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </React.Fragment>,
      ],
    };
  }
}
