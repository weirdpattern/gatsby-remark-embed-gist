# gatsby-remark-embed-gist

[![NPM badge](https://img.shields.io/npm/v/gatsby-remark-embed-gist.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-remark-embed-gist)
[![Travis badge](https://img.shields.io/travis/weirdpattern/gatsby-remark-embed-gist.svg?branch=master&style=flat-square)](https://travis-ci.org/weirdpattern/gatsby-remark-embed-gist)
[![codecov](https://codecov.io/gh/weirdpattern/gatsby-remark-embed-gist/branch/master/graph/badge.svg)](https://codecov.io/gh/weirdpattern/gatsby-remark-embed-gist)

This plugin allows content authors to embed [Gist](https://gist.github.com/)
snippets.

## Getting started

To embed a Gist snippet in you markdown/remark content, simply add an inline code
block using the `gist:` protocol.

```md
`gist:[<username>/]<gist_id>#<gist_file>`
`gist:[<username>/]<gist_id>#<gist_file>?lines=<number|ranges>`
`gist:[<username>/]<gist_id>#<gist_file>?highlights=<number|ranges>`
`gist:[<username>/]<gist_id>#<gist_file>?highlights=<number|ranges>&lines=<number|ranges>`
`gist:[<username>/]<gist_id>?file=<gist_file>`
`gist:[<username>/]<gist_id>?file=<gist_file>?lines=<number|ranges>`
`gist:[<username>/]<gist_id>?file=<gist_file>?highlights=<number|ranges>`
`gist:[<username>/]<gist_id>?file=<gist_file>?highlights=<number|ranges>&lines=<number|ranges>`
```

Where:

- **username**, represents the github handler whose gist is to be accessed.  
  Can be defaulted via configuration.
- **gist_id**, is the id of the gist to be accessed.  
  This is the hash value in the gist url, e.g. https://gist.github.com/<username\>/`ce54fdb1e5621b5966e146026995b974`).
- **gist_file**, is the name of the file in the gist to be accessed.

Highlights and lines can be defined using:

- A single number (e.g. `highlights=1`, `lines=1`)
- A list of numbers (e.g. `highlights=1,4`, `lines=1,4`)
- A range of numbers (e.g. `highlights=1-4`, `lines=1-4`)
- A combination of all above (e.g. `highlights=1,3,7-9`, `lines=1,3,7-9`)

## Installation

`yarn add gatsby-remark-embed-gist`

## Usage

```javascript
// In your gatsby-config.js
{
  resolve: "gatsby-transformer-remark",
  options: {
    plugins: [
      {
        resolve: "gatsby-remark-embed-gist",
        options: {
          // Optional:

          // the github handler whose gists are to be accessed
          username: "<string>",

          // a flag indicating whether the github default gist css should be included or not
          // default: true
          // DEPRECATED (PLEASE USE gistDefaultCssInclude)
          includeDefaultCss: true || false,

          // a flag indicating whether the github default gist css should be included or not
          // default: true
          gistDefaultCssInclude: true || false,

          // a flag indicating whether the github default gist css should be preloaded or not
          // use this if you want to load the default css asynchronously.
          // default: false
          gistCssPreload: true || false,

          // a string that represents the github default gist css url.
          // defaults: "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
          gistCssUrlAddress: "<string>"
        }
      }
    ]
  }
}
```

## Example

Turns this...

```md
`gist:weirdpattern/ce54fdb1e5621b5966e146026995b974#syntax.text`
```

Into this...

```html
<div id="gist90436059" class="gist">
  <div class="gist-file">
    <div class="gist-data">
      <div
        class="js-gist-file-update-container js-task-list-container file-box"
      >
        <div id="file-syntax-text" class="file">
          <div itemprop="text" class="blob-wrapper data type-text">
            <table
              class="highlight tab-size js-file-line-container"
              data-tab-size="8"
            >
              <tbody>
                <tr>
                  <td
                    id="file-syntax-text-L1"
                    class="blob-num js-line-number"
                    data-line-number="1"
                  ></td>
                  <td
                    id="file-syntax-text-LC1"
                    class="blob-code blob-code-inner js-file-line"
                  >
                    &lt;operation&gt; [n]&gt; /dev/null [options]
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="gist-meta">
      <a
        href="https://gist.github.com/weirdpattern/ce54fdb1e5621b5966e146026995b974/raw/30a0ad953a8d79c8bcbdd76343d86a9e4bbda311/syntax.text"
        style="float:right"
        >view raw</a
      >
      <a
        href="https://gist.github.com/weirdpattern/ce54fdb1e5621b5966e146026995b974#file-syntax-text"
        >syntax.text</a
      >
      hosted with ❤ by <a href="https://github.com">GitHub</a>
    </div>
  </div>
</div>
```

## Notes

The order of the plugins only matters when used in conjunction with
`gatsby-remark-prismjs`, because this plugin transforms the inline code blocks,
so add `gatsby-remark-embed-gist` somewhere above this plugin.

## License

MIT, by Patricio Trevino
