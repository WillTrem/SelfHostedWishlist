import { Button } from '@chakra-ui/react/button';
import { Card } from '@chakra-ui/react/card';
import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { injectPriceSelector, removePriceSelector } from './helpers/PriceSelectorHelpers';

const ItemPicker: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Apply content script functionality when component mounts
    injectPriceSelector();

    // Clean up when component unmounts
    return () => {
      removePriceSelector();
    };
  }, []);

  function handleCancel() {
    navigate('/');
  }

  return (
    <Card.Root variant={'elevated'} w={360} h={160}>
      <Card.Body>
        <Card.Title>Click on the product's price</Card.Title>
        <Card.Description>Or enter price manually.</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent={'end'}>
        <Button variant={'ghost'} onClick={handleCancel}>
          Cancel
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ItemPicker;
