"use client";

import { useEffect, useRef } from "react";
import { IMessage, useMessage } from "./messages";

const InitMessages = ({ messages }: { messages: IMessage[] }) => {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }

    initState.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default InitMessages;
