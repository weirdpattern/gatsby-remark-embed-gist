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

  it("generates an embedded gist with username and file in query", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=syntax.text`"
    );

    const processed = await plugin({ markdownAST });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with username and file in query with single line highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1`"
    );

    const processed = await plugin({ markdownAST });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with username and file in query with multiple lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1,3,5,7`"
    );

    const processed = await plugin({ markdownAST });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with username and file in query with range of lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1-7`"
    );

    const processed = await plugin({ markdownAST });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with username and file in query with mixed lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1,3,4-7`"
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

  it("generates an embedded gist with default username and file in query", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=syntax.text`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username and file in query with single line highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=2`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username and file in query with muplie lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1,2,8`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username and file in query with range of lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=2-6`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("generates an embedded gist with default username and file in query with mixed lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=2,8-10,12-14`"
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

  it("inline username overrides configuration with file in query", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=syntax.text`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration with file in query with single line highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=5`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration with file in query with multiple lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=5,11`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration with file in query with range of lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=5-10`"
    );

    const processed = await plugin({ markdownAST }, { username: "john" });

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("inline username overrides configuration with file in query with mixed lines highlighted", async () => {
    const markdownAST = remark.parse(
      "`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=1-3,5,10-13`"
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

  it("fails when no id is provided and file is provided in query", async () => {
    const markdownAST = remark.parse("`gist:weirdpattern/?file=syntax.text`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Missing gist id information")
    );
  });

  it("fails with malformed queries", async () => {
    const markdownAST = remark.parse("`gist:weirdpattern/?syntax.text`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Malformed query. Check your 'gist:' imports")
    );
  });

  it("fails with queries that don't contain a file or highlights", async () => {
    const markdownAST = remark.parse("`gist:weirdpattern/?other=test`");
    expect(plugin({ markdownAST })).rejects.toEqual(
      new Error("Malformed query. Check your 'gist:' imports")
    );
  });

  it("ignores everything that is not inline code", async () => {
    const markdownAST = remark.parse("# Syntax");
    const originalMarkdownAST = markdownAST;

    const processed = await plugin({ markdownAST });

    expect(processed).toBeTruthy();
    expect(markdownAST).toBe(originalMarkdownAST);
  });

  it("defaults the url when one is not provided", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=2,8-10,12-14`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern" }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });

  it("uses the url when one is provided", async () => {
    const markdownAST = remark.parse(
      "`gist:ce54fdb1e5621b5966e146026995b974?file=example.sh&highlights=2,8-10,12-14`"
    );

    const processed = await plugin(
      { markdownAST },
      { username: "weirdpattern", overrides: { gistUrl: "https://gist.com" } }
    );

    expect(processed).toBeTruthy();
    expect(getNodeContent(markdownAST)).toMatchSnapshot();
  });
});
