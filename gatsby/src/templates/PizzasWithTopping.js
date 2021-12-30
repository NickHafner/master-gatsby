import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(---rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

export const q = graphql`
  query($name: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        name
        price
        id
        toppings {
          name
          id
        }
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const PizzaDisplay = ({ pizza }) => (
  <PizzaStyles>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>{pizza.name}</h2>
    </Link>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    {pizza.image && (
      <GatsbyImage fluid={pizza.image.asset.fluid} alt={pizza.name} />
    )}
  </PizzaStyles>
);

export default function PizzasWithTopping({
  pageContext,
  data: {
    pizzas: { nodes: pizzas },
  },
}) {
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFilter activeTopping={pageContext.name} />
      <PizzaGridStyles>
        {pizzas.map((pizza) => (
          <PizzaDisplay pizza={pizza} key={pizza.id} />
        ))}
      </PizzaGridStyles>
    </>
  );
}
