import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/faicon.svg" />
      <link rel="alternate icon" href="/faicon.ico" />
      <meta name="viewport" content='"width=device-width, initial-scale=1.0' />
      <meta name="description" content={site.siteMetadata.description} />

      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
      />
      <meta
        property="og:title"
        content={title || site.siteMetadata.title}
        key="ogtitle"
      />
      {children}
    </Helmet>
  );
}
