import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const ToppingsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3.6rem;
  a {
    display: grid;
    padding: 5px;
    align-items: center;
    border-radius: 2px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

const countPizzaInToppings = (pizzas) => {
  console.log('eval');
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      (acc[topping.id]
        ? () => (acc[topping.id].count += 1)
        : () =>
            (acc[topping.id] = {
              id: topping.id,
              name: topping.name,
              count: 1,
            }))();
      return acc;
    }, {});

  return Object.values(counts).sort((a, b) => b.count - a.count);
};

export default function ToppingsFilter() {
  const data = useStaticQuery(
    graphql`
      query {
        toppings: allSanityTopping {
          nodes {
            name
            id
            vegetarian
          }
        }
        pizzas: allSanityPizza {
          nodes {
            name
            id
            toppings {
              id
              name
            }
          }
        }
      }
    `
  );

  const {
    toppings: { nodes: toppings },
    pizzas: { nodes: pizzas },
  } = data;

  const pizzaToppingCounts = useMemo(() => countPizzaInToppings(pizzas), [
    pizzas,
  ]);
  return (
    <ToppingsStyle>
      {pizzaToppingCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyle>
  );
}
