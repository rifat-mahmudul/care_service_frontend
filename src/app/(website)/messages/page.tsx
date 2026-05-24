import React from "react";
import MessagingPage from "./_components/MessagingPage";

const page = ({
  searchParams,
}: {
  searchParams?: { id?: string };
}) => {
  return (
    <div className="container mt-32 mb-20">
      <MessagingPage initialConversationId={searchParams?.id} />
    </div>
  );
};

export default page;
