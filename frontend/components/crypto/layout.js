import Head from "next/head";
import React from "react";

export default function layout({ title, children }) {
  return (
    <div
      style={{
        fontFamily: `BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif`,
      }}
    >
      <Head>
        <title> {title}</title>
        <meta charSet="UTF-8"></meta>
      </Head>
      {children}
    </div>
  );
}
