import { Button, IconButton } from '@chakra-ui/react/button';
import { Flex } from '@chakra-ui/react/flex';
import { Tabs } from '@chakra-ui/react/tabs';
import { Heading } from '@chakra-ui/react/typography';
import { LuScrollText, LuSettings, LuX } from 'react-icons/lu';
import { Text } from '@chakra-ui/react/typography';
import { HStack } from '@chakra-ui/react/stack';
import { useEffect, useState } from 'react';
import Item from './interfaces/Item';
import { deleteItem, getItems } from './api/itemsApi';
import { useNavigate } from 'react-router';
import ItemCard from './components/ItemCard';

function Home() {
  const [items, setItems] = useState<Item[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      void getItemList();
    }
  }, [loading]);

  async function getItemList() {
    setLoading(true);
    const newItems = await getItems();
    setItems(newItems);
    setLoading(false);
  }

  async function handleDeleteItem(id: number) {
    await deleteItem(id);
    setLoading(true);
  }

  function handleAddProduct() {
    navigate('/pick-item');
  }

  return (
    <Tabs.Root defaultValue={'list'} variant={'enclosed'}>
      <Flex
        id='container'
        direction={'column'}
        width={360}
        height={600}
        // justify={"space-evenly"}
        shadow={'md'}
        overflow={'hidden'}
      >
        <Flex
          id='header'
          justifyContent={'space-between'}
          backgroundColor={'gray.50'}
          alignItems={'center'}
          px={'4'}
          py={'2'}
        >
          <Heading>Self Hosted Wishlist</Heading>
          <HStack>
            <Tabs.List>
              <Tabs.Trigger value='list' asChild>
                <LuScrollText size={'4em'} />
              </Tabs.Trigger>
              <Tabs.Trigger value='settings' asChild>
                <LuSettings size={'4em'} />
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <IconButton
              variant={'ghost'}
              onClick={() => {
                const container = document.getElementById('wishlist-extension-root');
                if (container) {
                  container.style.display = 'none';
                }
              }}
            >
              <LuX />
            </IconButton>
          </HStack>
        </Flex>
        <Flex id='content' width={'100%'} height={'100%'} overflow={'hidden'}>
          <Tabs.Content value='list' p={0}>
            <Flex
              id='list-tab-container'
              justify={'center'}
              direction={'column'}
              h={'100%'}
              overflow={'hidden'}
              gap={'2'}
            >
              {
                <Flex
                  id='list-container'
                  flex={1}
                  overflowY={'auto'}
                  direction={'column'}
                  gap={'2'}
                  p={'4'}
                  bgColor={'gray.100'}
                >
                  {!loading ? (
                    items ? (
                      items.map((item) => {
                        return <ItemCard item={item} onDelete={handleDeleteItem} />;
                      })
                    ) : (
                      <Text>No items</Text>
                    )
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </Flex>
              }
              <Flex
                id='list-tab-footer'
                justify={'center'}
                align={'center'}
                // grow={1}
                shrink={1}
                // maxH={'15%'}
                bgColor={'gray.50'}
                p={'3'}
              >
                <Button onClick={handleAddProduct}>Add Product</Button>
              </Flex>
            </Flex>
          </Tabs.Content>
          <Tabs.Content value='settings'>SETTINGS</Tabs.Content>
        </Flex>
      </Flex>
    </Tabs.Root>
  );
}

export default Home;
