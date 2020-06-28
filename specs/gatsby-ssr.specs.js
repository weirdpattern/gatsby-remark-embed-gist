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

  it("executes when gistDefaultCssInclude is default", () => {
    onRenderBody({ setHeadComponents });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("executes when includeDefaultCss is true", () => {
    onRenderBody({ setHeadComponents }, { includeDefaultCss: true });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("executes when gistDefaultCssInclude is true", () => {
    onRenderBody({ setHeadComponents }, { gistDefaultCssInclude: true });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("doesn't execute when includeDefaultCss is false", () => {
    onRenderBody({ setHeadComponents }, { includeDefaultCss: false });
    expect(setHeadComponents).toHaveBeenCalledTimes(0);
  });

  it("doesn't execute when gistDefaultCssInclude is false", () => {
    onRenderBody({ setHeadComponents }, { gistDefaultCssInclude: false });
    expect(setHeadComponents).toHaveBeenCalledTimes(0);
  });

  it("executes when gistCssPreload is missing", () => {
    onRenderBody({ setHeadComponents });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("executes when gistCssPreload is false", () => {
    onRenderBody({ setHeadComponents }, { gistCssPreload: false });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
  });

  it("executes when gistCssPreload is true", () => {
    onRenderBody({ setHeadComponents }, { gistCssPreload: true });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
    expect(setHeadComponents.mock.calls[0][0].length).toBe(3);
  });

  it("executes when gistCssPreload is true", () => {
    onRenderBody({ setHeadComponents }, { gistCssPreload: true });
    expect(setHeadComponents).toHaveBeenCalledTimes(1);
    expect(setHeadComponents.mock.calls[0][0].length).toBe(3);
  });

  it("updates the url when one is provided", () => {
    onRenderBody(
      { setHeadComponents },
      { gistCssPreload: true, gistCssUrlAddress: "https://test" }
    );
    expect(setHeadComponents).toHaveBeenCalledTimes(1);

    const value = setHeadComponents.mock.calls[0][0][0];
    expect(value.props.href === "https://test").toBeTruthy();
  });
});
