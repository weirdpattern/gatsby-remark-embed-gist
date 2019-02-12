import React from "react";
import { onRenderBody } from "../src/gatsby-ssr";

const setHeadComponents = jest.fn();

describe("gatsby-ssr", () => {
  beforeEach(() => {
    setHeadComponents.mockReset();
  });

  it("executes when includeDefaultCss is default", () => {
    onRenderBody({ setHeadComponents });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("executes when includeDefaultCss is true", () => {
    onRenderBody({ setHeadComponents }, { includeDefaultCss: true });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("doesn't execute when includeDefaultCss is false", () => {
    onRenderBody({ setHeadComponents }, { includeDefaultCss: false });
    expect(setHeadComponents).toHaveBeenCalledTimes(0);
  });

  it("defaults the url when one is not provided", () => {
    onRenderBody({ setHeadComponents });

    expect(setHeadComponents).toHaveBeenCalledTimes(1);
    expect(setHeadComponents).toHaveBeenCalledWith([
      <link
        key="gist-embedded-css-key"
        rel="stylesheet"
        href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
      />
    ]);
  });

  it("uses the url when one is provided", () => {
    const url = "https://github.githubassets.com/assets/test.css";

    onRenderBody({ setHeadComponents }, { overrides: { gistCssUrl: url } });

    expect(setHeadComponents).toHaveBeenCalledTimes(1);
    expect(setHeadComponents).toHaveBeenCalledWith([
      <link key="gist-embedded-css-key" rel="stylesheet" href={url} />
    ]);
  });
});
