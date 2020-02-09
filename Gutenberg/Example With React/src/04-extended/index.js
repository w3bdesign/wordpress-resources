const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { 
  AlignmentToolbar,
  BlockControls,
  ColorPalette,
  InspectorControls,  
  MediaUpload, 
  RichText, 
  URLInputButton } = wp.editor;
const { 
  IconButton,
  PanelBody } = wp.components;

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("gutenberg/extended", {
  title: __("Extended episode promo", "gutenberg"),
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
    },
    episodeDescription: {
      type: "array",
      source: "children",
      multiline: "p",
      selector: ".gutenberg-description"
    },
    episodeURL: {
      type: "string",
      source: "attribute",
      selector: ".gutenberg-cta a",
      attribute: "href"
    },
    descriptionAlignment: {
      type: "string",
      default: "left"
    },
    backgroundColor: {
      type: "string"
    }
  },
  supports: {
    align: [ 'wide', 'full' ]
  },
  styles: [
    {
        name: 'default',
        label: __( 'Red (default)', "gutenberg" ),
        isDefault: true
    },
    {
        name: 'blue',
        label: __( 'Blue', "gutenberg" )
    },
    {
        name: 'yellow',
        label: __( 'Yellow', "gutenberg" )
    }
  ],

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: { 
        epsiodeTitle, 
        episodeImage, 
        episodeDescription, 
        episodeURL,
        descriptionAlignment,
        backgroundColor },
      className,
      setAttributes
    } = props;

    // Grab newEpisodeTitle, set the value of episodeTitle to newEpisodeTitle.
    const onChangeEpisodeTitle = newEpisodeTitle => {
      setAttributes({ epsiodeTitle: newEpisodeTitle });
    };

    // Grab imageObject, set the value of episodeImage to imageObject.sizes.gutenbergFeatImg.url.
    const onImageSelect = imageObject => {
      setAttributes({ episodeImage: imageObject.sizes.gutenbergFeatImg.url });
    };

    // Grab newEpisodeDescription, set the value of episodeDescription to newEpisodeDescription.
    const onChangeEpisodeDescription = newEpisodeDescription => {
      setAttributes({ episodeDescription: newEpisodeDescription });
    };

    // Grab newEpisodeURL, set the value of episodeURL to newEpisodeURL.
    const onChangeEpisodeURL = newEpisodeURL => {
      setAttributes({ episodeURL: newEpisodeURL });
    };

    // Grab newDescriptionAlignment, set the value of descriptionAlignment to newDescriptionAlignment.
    const onChangeDescriptionAlignment = newDescriptionAlignment => {
      setAttributes({ descriptionAlignment: newDescriptionAlignment });
    };

    // Grab newBackgroundColor, set the value of backgroundColor to newBackgroundColor.
    const onChangeBackgroundColor = newBackgroundColor => {
      setAttributes({ backgroundColor: newBackgroundColor });
    };

    return [
      <InspectorControls>
        <PanelBody title={ __( 'Color settings', "gutenberg" ) }>
          <div className="components-base-control">
            <div className="components-base-control__field">
              <label className="components-base-control__label">
                {__("Background color", "gutenberg")}
              </label>
              <ColorPalette
                value={backgroundColor}
                onChange={onChangeBackgroundColor} 
              />
            </div>
          </div>
        </PanelBody>
      </InspectorControls>,
      <div 
        className={`${className} gutenberg-block gutenberg-expanded`}
        style={{
          background: backgroundColor
        }}
        >
        <BlockControls>
          <AlignmentToolbar 
            value={descriptionAlignment}
            onChange={onChangeDescriptionAlignment}
          />
        </BlockControls>
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
        </div>
        <div className="gutenberg-description">
          <RichText
            style={{ textAlign: descriptionAlignment }}
            multiline="p"
            placeholder={__("Episode description", "gutenberg")}
            onChange={onChangeEpisodeDescription}
            value={episodeDescription}
          />
        </div>
        <div className="gutenberg-cta">
          {/* Note: href is NOT populated with attribute to avoid
              accidental navigation from within the editor. */}
          <a href="#">{__("Listen now!", "gutenberg")}</a>
          <URLInputButton
            className="gutenberg-dropdown__input"
            label={__("Episode URL", "gutenberg")}
            onChange={onChangeEpisodeURL}
            url={episodeURL}
          />
        </div>
      </div>
    ];
  },
  save: props => {
    const {
      attributes: {  
        epsiodeTitle, 
        episodeImage, 
        episodeDescription, 
        episodeURL,
        descriptionAlignment,
        backgroundColor }
    } = props;

    return (
      <div 
        className="gutenberg-block gutenberg-expanded"
        style={{
          background: backgroundColor
        }}>
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
        </div>
        <div className="gutenberg-description" style={`text-align:${descriptionAlignment}`}>
          <RichText.Content
            multiline="p"
            value={episodeDescription}
          />
        </div>
        <div className="gutenberg-cta">
          {/* Note: href IS populated with attribute here
              because this is where the link is saved. */}
          <a href={episodeURL}>
            {__("Listen now!", "gutenberg")}
          </a>
        </div>
      </div>
    );
  }
});
