import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
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
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default function PizzasPage({ data }) {
  const {
    pizzas: { nodes: pizzas },
  } = data;

  return (
    <>
      <SEO title="All Pizzas" />
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
}
