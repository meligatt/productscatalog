import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Box, Columns, Column } from "bumbag";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductList_products } from "./__generated__/ProductList_products.graphql";

type ProductListProps = {
  products: ProductList_products;
};

const ProductList: React.FunctionComponent<ProductListProps> = ({
  products,
}) => {
  return (
    <Box padding="major-2">
      <Columns aria-labelledby="heading-destacados">
        {products && products.edges && products.edges.length > 0 ? (
          products.edges.map((product: any) => {
            return (
              <Column
                padding="major-2"
                key={product.node.id}
                spread={4}
                spreadDesktop={6}
                spreadMobile={12}
              >
                <ProductCard
                  productId={product.node.id}
                  name={product.node.name}
                  linkImage={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/${product.node.imagePath}`}
                  attachmentPath={product.node.attachmentPath}
                />
              </Column>
            );
          })
        ) : (
          <div>
            No se encontraron productos. Intente con otra palabra o categoría.
          </div>
        )}
      </Columns>
    </Box>
  );
};

export default createFragmentContainer(ProductList, {
  products: graphql`
    fragment ProductList_products on ProductConnection {
      edges {
        node {
          id
          name
          imagePath
          attachmentPath
        }
      }
    }
  `,
});
