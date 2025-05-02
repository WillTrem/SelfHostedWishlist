import { Button } from '@chakra-ui/react/button';
import { Card } from '@chakra-ui/react/card';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { injectPriceSelector, removePriceSelector } from './helpers/PriceSelectorHelpers';
import { parseCurrentItem } from './helpers/ItemInfoParser';
import ItemCard from './components/ItemCard';
import { VStack } from '@chakra-ui/react';
import { itemsApi } from './api/itemsApi';
import { Item, ItemInsert } from './types/DatabaseTypesShortcuts';

const ItemPicker: FunctionComponent = () => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState<Partial<Item>>();

  useEffect(() => {
    // Apply content script functionality when component mounts
    injectPriceSelector(handlePriceSelect);

    // Clean up when component unmounts
    return () => {
      removePriceSelector();
    };
  }, []);

  function handleCancel() {
    navigate('/');
  }

  function handlePriceSelect(priceStr: string) {
    console.log('SelectedPrice: ', priceStr);
    const newItem: Partial<Item> = { ...parseCurrentItem(), price: priceStr };
    setCurrentItem(newItem);
  }

  async function handleConfirm() {
    if (currentItem) {
      await itemsApi.addItem(currentItem as ItemInsert);
      navigate('/');
    }
  }

  return (
    <Card.Root variant={'elevated'} w={360} minH={160}>
      <Card.Body>
        {currentItem ? (
          <VStack gap={'4'}>
            <Card.Title>Is the product info correct?</Card.Title>
            <ItemCard item={currentItem} />
          </VStack>
        ) : (
          <>
            <Card.Title>Click on the product's price</Card.Title>
            <Card.Description>Or enter price manually.</Card.Description>
          </>
        )}
      </Card.Body>
      <Card.Footer justifyContent={'end'}>
        <Button variant={'ghost'} onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={() => void handleConfirm()}>Confirm</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ItemPicker;
