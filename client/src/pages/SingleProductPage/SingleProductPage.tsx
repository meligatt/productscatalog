import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useParams, useHistory } from "react-router-dom";
import { Button, Columns, Column } from "bumbag";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

type SingleProductPageProps = {
  environment: Environment;
};

export const SingleProductPage: React.FunctionComponent<SingleProductPageProps> = ({
  environment,
}): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const { goBack } = useHistory();

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query SingleProductPageQuery($id: ID!) {
          node(id: $id) {
            ... on Product {
              id
              name
              description
              imagePath
              attachmentPath
            }
          }
        }
      `}
      variables={{ id: productId }}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Se ha producido un Error, intente nuevamente.</div>;
        }
        if (!props) {
          return <Loader />;
        }
        if (!props.node) {
          return (
            <div>
              Se ha producido un Error, intente nuevamente haciendo click en una
              categoría y luego seleccione un producto.
            </div>
          );
        }

        return (
          <PageWrapper title="Comercial Gattoni seguridad industrial - Detalle de producto">
            <Columns style={{ justifyContent: "center" }}>
              <Column key={props.node.id} spread={9}>
                <Button
                  palette="primary"
                  variant="outlined"
                  onClick={() => {
                    goBack();
                  }}
                  marginBottom="1rem"
                >
                  &#8592; volver a resultados
                </Button>
                <ProductCard
                  productId={props.node.id}
                  name={props.node.name}
                  description={props.node.description}
                  attachmentPath={props.node.attachmentPath}
                  linkImage={props.node.imagePath}
                  hasPrintCTA
                  isSinglePage
                />
              </Column>
            </Columns>
          </PageWrapper>
        );
      }}
    />
  );
};
export default SingleProductPage;
