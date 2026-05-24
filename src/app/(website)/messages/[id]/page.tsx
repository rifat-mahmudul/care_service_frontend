import React from "react";
import MessagingPage from "../_components/MessagingPage";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mt-32 mb-20">
      <MessagingPage initialConversationId={params.id} />
    </div>
  );
};

export default page;
