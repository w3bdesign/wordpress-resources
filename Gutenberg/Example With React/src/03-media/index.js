const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText } = wp.editor;
const { Button, IconButton } = wp.components;

console.info(wp.components);

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("gutenberg/media", {
  title: __("Custom title and image", "gutenberg"),
  icon: { src: Logo },
  category: "gutenberg",
  attributes: {
    epsiodeTitle: {
      type: "string",
      source: "html",
      selector: ".gutenberg-title"
    },
    episodeImage: {
      type: "string",
      source: "attribute",
      selector: ".gutenberg-logo img",
      attribute: "src",
      default: logoWhiteURL
    }
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: { epsiodeTitle, episodeImage },
      className,
      setAttributes
    } = props;

    // Grab newEpisodeTitle, set the value of episodeTitle to newEpisodeTitle.
    const onChangeEpisodeTitle = newEpisodeTitle => {
      setAttributes({ epsiodeTitle: newEpisodeTitle});
    };

    // Grab imageObject, set the value of episodeImage to imageObject.sizes.gutenbergFeatImg.url.
    const onImageSelect = imageObject => {
      setAttributes({ episodeImage: imageObject.sizes.gutenbergFeatImg.url });
    };

    return (
      <div className={`${className} gutenberg-block gutenberg-editable`}>
        <figure className="gutenberg-logo">
          <img src={episodeImage} alt="logo" />
          <MediaUpload
            onSelect={onImageSelect}
            type="image"
            value={episodeImage}
            render={({ open }) => (
              <IconButton
                className="gutenberg-logo__button"
                onClick={open}
                icon="format-image"
                showTooltip="true"
                label={__("Change image.", "gutenberg")}
              /> 
            )}
          />
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
      attributes: { epsiodeTitle, episodeImage }
    } = props;

    return (
      <div className="gutenberg-block gutenberg-static">
        <figure className="gutenberg-logo">
          <img src={episodeImage} alt="logo" />
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
