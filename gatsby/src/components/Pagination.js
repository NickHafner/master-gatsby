import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--gray);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPrev = currentPage > 1;
  const prev = currentPage - 1;
  const hasNext = currentPage < totalPages;
  const next = currentPage + 1;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrev} to={`${base}/${prev}`}>
        Prev &#8592;
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i + 1}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNext} to={`${base}/${next}`}>
        Next &#8594;
      </Link>
      <span>
        {currentPage} / {totalPages}
      </span>
    </PaginationStyles>
  );
}
