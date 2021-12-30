import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

export const q = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
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

export default function PizzaPage({ data }) {
  const {
    pizza: { name, image, toppings },
  } = data;
  return (
    <>
      <SEO title={name} image={image?.asset?.fluid?.src} />
      <Style>
        <GatsbyImage fluid={image.asset.fluid} />
        <div>
          <h2>{name}</h2>
          <ul>
            {toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </Style>
    </>
  );
}
