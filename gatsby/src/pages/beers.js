import { graphql } from 'gatsby';
import React from 'react';
import { MdStar as icon, MdStar } from 'react-icons/md';
import styled from 'styled-components';
import SEO from '../components/SEO';

export const q = graphql`
  query {
    allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;

const BeerGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const BeerStyle = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    display: grid;
    align-items: center;
    width: 100%;
    height: 200px;
    object-fit: contain;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title="We have {data.allBeer.nodes.length} Beers Available." />
      <h2 className="center">
        We have {data.allBeer.nodes.length} Beers Available. Dine in Only!
      </h2>
      <BeerGridStyle>
        {data.allBeer.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <BeerStyle key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'⭐'.repeat(rating)}
                <span style={{ filer: 'grayscale(100%)' }}>
                  {'⭐'.repeat(5 - rating)}
                </span>
              </p>
            </BeerStyle>
          );
        })}
      </BeerGridStyle>
    </>
  );
}
