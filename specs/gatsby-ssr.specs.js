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
});
