jest.mock("request-promise");

import remark from "remark";
import plugin from "../src/index";

const getNodeContent = node => node.children[0].children[0];

describe("gatsby-remark-embedded-gist", () => {
  it("generates an embedded gist with username", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974`"
    );

    const processed = await plugin({ markdownAST });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with username and file", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974#syntax.text`"
    );

    const processed = await plugin({ markdownAST });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username", async () => {
    const markdownAST = remark.parse("`gist:ce54fdb1e5621b5966e146026995b974`");

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username and file", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974#syntax.text`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration with file", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974#syntax.text`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });
    expect(processed).toBeTruthy();

    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("fails when no username is provided", async () => {
    const markdownAST = remark.parse("`gist:ce54fdb1e5621b5966e146026995b974`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Missing username information")
    );
  });

  it("fails when no id is provided", async () => {
    const markdownAST = remark.parse("`gist:weirdpattern/#syntax.text`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Missing gist id information")
    );
  });

  it("ignores everything that is not inline code", async () => {
    const markdownAST = remark.parse("# Syntax");
    const originalMarkdownAST = markdownAST;

    const processed = await plugin({ markdownAST });
    expect(processed).toBeTruthy();

    expect(markdownAST).toBe(originalMarkdownAST);
  });
});
