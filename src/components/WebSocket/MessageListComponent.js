import React, { useState } from "react";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  sendChat,
  useHandleChannel,
  useMetaInListMessage,
} from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import { MessageListCustom } from "./MessageListCustom";
import { ItemChat } from "./ItemChat";
import { useRef } from "react";
import { setMarkerInFilterMessage } from "../../app/slices/QuerySlice";
import { memo } from "react";

export const MessageListComponent = memo(() => {
  const dispatch = useDispatch();
  const userID = useUserID();
  const [inputValue, setInputValue] = useState("");
  const metaInMessage = useMetaInListMessage();
  const messageListRef = useRef(null);
  const handleChannel = useHandleChannel();

  const handleButtonSend = (e) => {
    e.preventDefault();
    // Add your logic for sending the message here
    if (inputValue !== "") {
      const body = {
        chat_room_id: handleChannel.id,
        from_user_id: userID,
        to_user_id:
          parseInt(handleChannel.to_user_id) == userID
            ? handleChannel.from_user_id
            : handleChannel.to_user_id,
        content: inputValue,
        seen: false,
        type: "TEXT",
      };
      dispatch(sendChat(body));
    }
    setInputValue("");
  };

  const handleScroll = () => {
    if (messageListRef.current.scrollTop === 0) {
      dispatch(setMarkerInFilterMessage(metaInMessage.paging.Current));
    }
  };

  const handleChangeText = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="w-full flex flex-col justify-between h-[350px]">
      <div className="flex-grow">
        <div>
          <ItemChat />
        </div>
        <div
          className="h-[220px] overflow-y-scroll"
          onScroll={handleScroll}
          ref={messageListRef}
        >
          <MessageListCustom />
        </div>
      </div>

      <div className="flex flex-row justify-between mb-2">
        <div className="bg-white rounded-lg shadow-md w-full h-full ">
          <form className="flex items-center ">
            <input
              type="text"
              onChange={handleChangeText}
              placeholder="Type your message..."
              className="flex-grow bg-gray-200 text-gray-700 rounded-full  p-2 overflow-y-scroll"
            />
            <button
              type="submit"
              onClick={handleButtonSend}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full py-2 px-4 transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});
