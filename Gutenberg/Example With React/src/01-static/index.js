const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";

// Import file as base64 encoded URI using url-loader.
// https://www.npmjs.com/package/url-loader
import logoWhiteURL from "../bv-logo-white.svg";

// https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
registerBlockType("gutenberg/static", {
  title: __("Like & Subscribe", "gutenberg"),
  icon: { src: Logo },
  category: "gutenberg",

  // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
  edit() {
    return (
      <div className="gutenberg-block gutenberg-static">
        <figure className="gutenberg-logo">
          <img src={logoWhiteURL} alt="logo" />
        </figure>
        <div className="gutenberg-info">
          <h3 className="gutenberg-title">
            {__("The Binaryville Podcast", "gutenberg")}
          </h3>
          <div className="gutenberg-cta">
            <a href="#">{__("Like & Subscribe!", "gutenberg")}</a>
          </div>
        </div>
      </div>
    );
  },
  save() {
    return (
      <div className="gutenberg-block gutenberg-static">
        <figure className="gutenberg-logo">
          <img src={logoWhiteURL} alt="logo" />
        </figure>
        <div className="gutenberg-info">
          <h3 className="gutenberg-title">
            {__("The Binaryville Podcast", "gutenberg")}
          </h3>
          <div className="gutenberg-cta">
            <a href="/subscribe">{__("Like & Subscribe!", "gutenberg")}</a>
          </div>
        </div>
      </div>
    );
  }
});
