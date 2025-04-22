import { Card, IconButton } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { Image } from '@chakra-ui/react/image';
import { Text } from '@chakra-ui/react/typography';
import { Item } from '@/types/DatabaseTypesShortcuts';

interface ItemCardProps {
  item: Partial<Item>;
  onDelete?: (id: number) => Promise<void>;
}

const ItemCard: FunctionComponent<ItemCardProps> = ({ item, onDelete }) => {
  return (
    <Card.Root
      width={'100%'}
      variant={'elevated'}
      key={item.id}
      overflow={'hidden'}
      flexShrink={0}
      maxH={280}
      maxW={310}
    >
      <Image src={item.image_url} alt={item.name} maxH={'100px'} minH={'100px'} fit={'contain'} />
      <Card.Body gap={'0.5'}>
        <Card.Title lineClamp={'2'}>{item.name}</Card.Title>
        <Card.Description lineClamp={'2'}>{item.website}</Card.Description>
      </Card.Body>
      <Card.Footer gap={'2'} justifyContent={'space-between'}>
        <Text textStyle='l' fontWeight='medium' letterSpacing='tight'>
          {item.price}
        </Text>
        {onDelete && (
          <IconButton size={'xs'} variant={'ghost'} onClick={() => void onDelete(item.id!)}>
            <LuTrash2 />
          </IconButton>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default ItemCard;
