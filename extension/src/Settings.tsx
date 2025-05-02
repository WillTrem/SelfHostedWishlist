import { Field, Flex, Input } from '@chakra-ui/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { LOCALSTORAGE_BASE_URL_KEY } from './constants';
import { Text } from '@chakra-ui/react/typography';
import { getApiUrl, setApiUrl } from './helpers/ExtensionStorageHelper';

const settings: FunctionComponent = () => {
  const [defaultValues, setDefaultValues] = useState<Record<string, string>>();
  console.log(chrome.storage);

  useEffect(() => {
    void fetchDefaultValues();
  }, []);

  async function fetchDefaultValues() {
    const baseUrl = await getApiUrl();
    setDefaultValues(() => {
      const newDefValues: Record<string, string> = {};
      if (baseUrl) {
        newDefValues[LOCALSTORAGE_BASE_URL_KEY] = baseUrl;
      }
      return newDefValues;
    });
  }

  async function handleBaseUrlChange(e: React.FocusEvent<HTMLInputElement>) {
    const newUrl = e.target.value;
    await setApiUrl(newUrl);
    // await setExtensionStorage(LOCALSTORAGE_BASE_URL_KEY, newUrl);
    fetchDefaultValues();
  }

  return (
    <Flex
      id='list-tab-container'
      justify={'center'}
      direction={'column'}
      h={'100%'}
      overflow={'hidden'}
      gap={'2'}
      bgColor={'gray.100'}
      p={'2'}
    >
      <Flex
        id='list-container'
        flex={1}
        overflowY={'auto'}
        direction={'column'}
        gap={'2'}
        p={'6'}
        bgColor={'white'}
        rounded={5}
      >
        {defaultValues ? (
          <Field.Root>
            <Field.Label>Server Base URL</Field.Label>
            <Input
              size={'2xs'}
              placeholder='http://localhost:5000'
              onBlur={handleBaseUrlChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              defaultValue={defaultValues[LOCALSTORAGE_BASE_URL_KEY] ?? ''}
            />
            <Field.HelperText>
              The base URL of your self hosted wishlist server instance
            </Field.HelperText>
          </Field.Root>
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default settings;
