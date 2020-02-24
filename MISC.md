## Misc

### File functions


```
get_theme_root() - Returns the address of the theme installation directory
```

```
get_template_directory_uri() - Retrieves the URI to the current theme's files
```

```
admin_url() - Provides the address of the WordPress administrative pages
```

```
content_url() - Indicates where the wp-content directory can be found
```

```
site_url() and home_url() - Returns the site address
```

```
includes_url() - Provides the location of WordPress include files
```

```
wp_upload_dir() - Indicates the directory where user-uploaded files are stored
```

```
plugins_url() - Retrieves a URL within the plugins or mu-plugins directory.
```

<hr>

### Content functions

```
get_the_title() - This function gives us quick access to the item's title
```

<hr>

### Wordpress functions

```
add_filter( 'hook_name', 'your_function_name', [priority], [accepted_args] ) - Hook a function or method to a specific filter action.
```

```
add_action( 'hook_name', 'your_function_name', [priority], [accepted_args] ) - Hook a function or method to a specific action action.
```


