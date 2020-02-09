const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("gutenberg/editable", {
  title: __("Custom Title", "gutenberg"),
  icon: { src: Logo },
  category: "gutenberg",
  attributes: {
    epsiodeTitle: {
      type: "string",
      source: "html",
      selector: ".gutenberg-title"
    }
  },

  edit: props => {
    // Props parameter holds all the info.
    console.info(props);

    // Lift info from props and populate various constants.
    const {
      attributes: { epsiodeTitle },
      className,
      setAttributes
    } = props;

    const onChangeEpisodeTitle = newEpisodeTitle => {
      setAttributes({ epsiodeTitle: newEpisodeTitle});
    };

    return (
      <div className={`${className} gutenberg-block gutenberg-editable`}>
        <figure className="gutenberg-logo">
          <img src={logoWhiteURL} alt="logo" />
        </figure>
        <div className="gutenberg-info">
          <div className="gutenberg-nameplate">
            {__("The Binaryville Podcast", "gutenberg")}
          </div>
          <h3 className="gutenberg-title">
            <RichText 
              placeholder={__("Podcast episode title", "gutenberg")}
              value={epsiodeTitle}
              onChange={onChangeEpisodeTitle}
            />
          </h3>
          <div className="gutenberg-cta">
            <a href="#">{__("Like & Subscribe!", "gutenberg")}</a>
          </div>
        </div>
      </div>
    );
  },
  save: props => {
    const {
      attributes: { epsiodeTitle }
    } = props;

    return (
      <div className="gutenberg-block gutenberg-static">
        <figure className="gutenberg-logo">
          <img src={logoWhiteURL} alt="logo" />
        </figure>
        <div className="gutenberg-info">
          <div className="gutenberg-nameplate">
            {__("The Binaryville Podcast", "gutenberg")}
          </div>
          <h3 className="gutenberg-title">
            <RichText.Content value={epsiodeTitle} />
          </h3>
          <div className="gutenberg-cta">
            <a href="/subscribe">{__("Like & Subscribe!", "gutenberg")}</a>
          </div>
        </div>
      </div>
    );
  }
});
