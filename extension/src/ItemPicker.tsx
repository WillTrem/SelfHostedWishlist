import { Button } from '@chakra-ui/react/button';
import { Card } from '@chakra-ui/react/card';
import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ItemPicker: FunctionComponent = () => {
  const navigate = useNavigate();

  // Function to inject the content script
  const injectScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['contentScript.js'],
        });
      }
    });
  };

  // Function to remove the content script
  const removeScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['cleanupScript.js'],
        });
      }
    });
  };
  useEffect(() => {
    // Inject the content script when the component mounts
    injectScript();

    // Remove the content script when the component unmounts
    return () => {
      removeScript();
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
