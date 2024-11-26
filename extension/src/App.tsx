import { Button, IconButton } from '@chakra-ui/react/button';
import { Flex } from '@chakra-ui/react/flex';
import { Tabs } from '@chakra-ui/react/tabs';
import { Heading } from '@chakra-ui/react/typography';
import { LuScrollText, LuSettings, LuTrash2, LuX } from 'react-icons/lu';
import { Card } from '@chakra-ui/react/card';
import { Image } from '@chakra-ui/react/image';
import { Text } from '@chakra-ui/react/typography';
import { HStack } from '@chakra-ui/react/stack';
import { useEffect, useState } from 'react';
import Item from './interfaces/Item';
import { getItems } from './api/itemsApi';

function App() {
  const [items, setItems] = useState<Item[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void getItemList();
  }, []);

  async function getItemList() {
    const newItems = await getItems();
    setItems(newItems);
    setLoading(false);
  }

  return (
    <Tabs.Root defaultValue={'list'} variant={'enclosed'}>
      <Flex
        id='container'
        direction={'column'}
        width={360}
        height={640}
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
            <IconButton variant={'ghost'}>
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
                        return (
                          <Card.Root
                            width={'100%'}
                            variant={'elevated'}
                            key={item.id}
                            overflow={'hidden'}
                            flexShrink={0}
                          >
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              maxH={'100px'}
                              minH={'100px'}
                              fit={'contain'}
                            />
                            <Card.Body gap={'0.5'}>
                              <Card.Title lineClamp={'2'}>{item.name}</Card.Title>
                              <Card.Description lineClamp={'2'}>{item.website}</Card.Description>
                            </Card.Body>
                            <Card.Footer gap={'2'} justifyContent={'space-between'}>
                              <Text textStyle='l' fontWeight='medium' letterSpacing='tight'>
                                {item.price}
                              </Text>
                              <IconButton size={'xs'} variant={'ghost'}>
                                <LuTrash2 />
                              </IconButton>
                            </Card.Footer>
                          </Card.Root>
                        );
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
                <Button>Add Product</Button>
              </Flex>
            </Flex>
          </Tabs.Content>
          <Tabs.Content value='settings'>SETTINGS</Tabs.Content>
        </Flex>
      </Flex>
    </Tabs.Root>
  );
}

export default App;
