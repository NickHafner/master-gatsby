import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

export const q = graphql`
  query($slug: String!) {
    sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const Style = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
  h2,
  p {
    margin: 0;
  }
`;

export default function SliceMaster({ data }) {
  const {
    person: { name, description, image },
  } = data;
  return (
    <Style>
      <GatsbyImage fluid={image.asset.fluid} />
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </Style>
  );
}
