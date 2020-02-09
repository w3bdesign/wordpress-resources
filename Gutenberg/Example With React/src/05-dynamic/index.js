const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { withSelect } = wp.data;

import { ReactComponent as Logo } from "../bv-logo.svg";
import logoWhiteURL from "../bv-logo-white.svg";

registerBlockType("gutenberg/dynamic", {
  title: __("Latest episode promo", "gutenberg"),
  icon: { src: Logo },
  category: "gutenberg",
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

  edit: withSelect( select => {
    return {
      // Send a GET query to the REST API.
      posts: select( "core" ).getEntityRecords( "postType", "post", {
        categories: 2,
        per_page: 1
      })
    };
  })(({ posts, className }) => {
    // Wait for posts to be returned.
    if ( !posts ) {
      return "Loading...";
    }
    
    // If no posts are returned.
    if ( posts && posts.length === 0 ) {
      return "No posts";
    }

    // Grab the first post.
    const post = posts[0];
    console.info(post);

    const featImg = imageURL => {
      return imageURL ? imageURL : logoWhiteURL;
    }

    return (
      <div className={`${className} gutenberg-block gutenberg-dynamic`} >
        <figure className="gutenberg-logo">
          <img src={featImg(post.featured_image_gutenbergFeatImg_url)} alt="logo" />
        </figure>
        <div className="gutenberg-info">
          <div className="gutenberg-nameplate">
            {__("The Binaryville Podcast", "gutenberg")}
          </div>
          <h3 className="gutenberg-title">
            <RichText.Content value={post.title.rendered} />
          </h3>
        </div>
        <div className="gutenberg-description">
        <RichText.Content value={post.excerpt.rendered} />
        </div>
        <div className="gutenberg-cta">
          <a href={post.link}>{__("Listen now!", "gutenberg")}</a>
        </div>
      </div>
    );
  }),
  
  save(props) {
    return null;
  }
});
