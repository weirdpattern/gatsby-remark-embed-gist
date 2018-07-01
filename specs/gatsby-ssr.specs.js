import { onRenderBody } from "../src/gatsby-ssr";

const setHeadComponent = jest.fn();

describe("gatsby-ssr", () => {
  beforeEach(() => {
    setHeadComponent.mockReset();
  });

  it("executes when includeDefaultCss is default", () => {
    onRenderBody({ setHeadComponent });
    expect(setHeadComponent).toHaveBeenCalledTimes(1);
  });

  it("executes when includeDefaultCss is true", () => {
    onRenderBody({ setHeadComponent }, { includeDefaultCss: true });
    expect(setHeadComponent).toHaveBeenCalledTimes(1);
  });

  it("doesn't execute when includeDefaultCss is false", () => {
    onRenderBody({ setHeadComponent }, { includeDefaultCss: false });
    expect(setHeadComponent).toHaveBeenCalledTimes(0);
  });
});
