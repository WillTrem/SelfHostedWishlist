import { Flex } from "@chakra-ui/react/flex";
import { Tabs } from "@chakra-ui/react/tabs";
import { Heading } from "@chakra-ui/react/typography";
import { FunctionComponent } from "react";
import { LuScrollText, LuSettings } from "react-icons/lu";

const Navbar: FunctionComponent = () => {
  return (
    <Flex justifyContent={"space-between"} backgroundColor={"gray.50"}>
      <Heading>Self Hosted Wishlist</Heading>
      <Tabs.Root defaultValue={"list"}>
        <Tabs.List>
          <Tabs.Trigger value="list" asChild>
            <LuScrollText />
          </Tabs.Trigger>
          <Tabs.Trigger value="settings" asChild>
            <LuSettings />
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Flex>
  );
};

export default Navbar;
