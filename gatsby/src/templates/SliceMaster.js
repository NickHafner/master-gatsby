import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

export const q = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
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
  h2 {
    span {
      background: var(--yellow);
      padding: 0.2rem;
      transform: rotate(-1.1deg);
    }
  }
  p {
    margin-top: 1rem;
  }
`;

export default function SliceMaster({ data }) {
  const {
    person: { name, description, image },
  } = data;
  return (
    <>
      <SEO title={`Slicemaster - ${name}`} image={image?.asset?.fluid?.src} />
      <Style>
        <GatsbyImage fluid={image.asset.fluid} />
        <div>
          <h2>
            <span>{name}</span>
          </h2>
          <p>{description}</p>
        </div>
      </Style>
    </>
  );
}
