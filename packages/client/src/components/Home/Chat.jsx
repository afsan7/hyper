import { VStack } from "@chakra-ui/layout";
import { TabPanels, TabPanel } from "@chakra-ui/react";
import { FriendContext } from "./Home";
import { useContext } from "react";
import { Text } from "@chakra-ui/react";

const Chat = () => {
  const { friendList } = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>Friend One</TabPanel>
        <TabPanel>Friend two</TabPanel>
      </TabPanels>
    </VStack>
  ) : (
    <VStack
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
        <Text>No friends found. Add some friends before chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
