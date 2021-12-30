import _fetch from 'isomorphic-fetch';
import path from 'path';

async function pizzasToPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        name: pizza.name,
        slug: pizza.slug.current,
      },
    });
  });
}

async function pizzasForToppingsToPages({ graphql, actions }) {
  const pizzasTemplate = path.resolve('./src/templates/PizzasWithTopping.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: pizzasTemplate,
      context: {
        name: topping.name,
      },
    });
  });
}

async function fetchAndAdaptBeers({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await _fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  beers.forEach((beer) => {
    const evaledBeer = {
      ...beer,
      rating: beer.rating ? { ...beer.rating } : { average: 0, reviews: 0 },
    };
    const meta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...evaledBeer,
      ...meta,
    });
  });
}

async function paginateSlicemasters({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      people: allSanityPerson {
        nodes {
          name
          id
          description
          slug {
            current
          }
        }
        totalCount
      }
    }
  `);

  data.people.nodes.forEach((person) => {
    actions.createPage({
      path: `/slicemasters/${person.slug.current}`,
      component: path.resolve('./src/templates/SliceMaster.js'),
      context: {
        name: person.name,
        slug: person.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_SLICEMASTERS_PAGINATION);
  const pageCount = Math.ceil(data.people.nodes.length / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  await Promise.all([fetchAndAdaptBeers(params)]);
}

export async function createPages(params) {
  await Promise.all([
    pizzasToPages(params),
    paginateSlicemasters(params),
    pizzasForToppingsToPages(params),
  ]);
}
