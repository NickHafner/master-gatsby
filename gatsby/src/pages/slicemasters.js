import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

export const q = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    people: allSanityPerson(limit: $pageSize, skip: $skip) {
      nodes {
        name
        id
        description
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
      total: totalCount
    }
  }
`;

const MastersGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const MasterStyle = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    background: var(--yellow);
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .desc {
    padding: 1rem;
    margin: 2rem;
    z-index: 2;
    margin-top: -6rem;
    text-align: center;
    position: relative;
    transform: rotate(1.2deg);
    background: var(--yellow);
  }
`;

export default function SliceMastersPage({ data, pageContext }) {
  const masters = data.people.nodes;
  console.log(pageContext);
  return (
    <>
      <Pagination
        pageSize={
          pageContext.pageSize || process.env.GATSBY_SLICEMASTERS_PAGINATION
        }
        totalCount={data.people.total}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip || 0}
        base="/slicemasters"
      />
      <MastersGrid>
        {masters.map((person) => (
          <MasterStyle>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="name">{person.name}</span>
              </h2>
            </Link>
            <GatsbyImage fluid={person.image.asset.fluid} />
            <p className="desc">{person.description}</p>
          </MasterStyle>
        ))}
      </MastersGrid>
    </>
  );
}
