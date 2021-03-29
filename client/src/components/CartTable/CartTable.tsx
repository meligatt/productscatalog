import React from "react";
import { Button, Table, styled, Image } from "bumbag";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import { useHomePageContext } from "../../context/HomePageContext";
import { useAlert } from "react-alert";

const ImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 90px;
  margin-right: 1.5rem;
  @media (min-width: 760px) {
    max-height: 60px;
  }
`;

interface CartProps {
  isEditable?: boolean;
}

// TODO: we need to grab the product name via query maybe
export const CartTable: React.FunctionComponent<CartProps> = ({
  isEditable = true,
}): JSX.Element => {
  const alert = useAlert();
  const { cart, removeCartItem } = useHomePageContext();
  return (
    <Table isResponsive>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Imagen:</Table.HeadCell>
          <Table.HeadCell>Producto:</Table.HeadCell>
          <Table.HeadCell>Cantidad:</Table.HeadCell>
          {isEditable && <Table.HeadCell>Acción:</Table.HeadCell>}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => {
            return (
              <Table.Row key={item.productName}>
                <Table.Cell>
                  <ImageStyled
                    fit="cover"
                    src={item.productImage}
                    alt={item.productName}
                  />
                </Table.Cell>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>
                  {isEditable ? (
                    <QuantityPicker
                      productId={item.productId}
                      quantity={item.quantity}
                    />
                  ) : (
                    <span>{item.quantity}</span>
                  )}
                </Table.Cell>
                {isEditable && (
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        removeCartItem(item.productId);
                        alert.show("Producto eliminado!", {
                          type: "info",
                        });
                      }}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Borrar
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};
