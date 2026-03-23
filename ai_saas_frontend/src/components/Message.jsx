function Message({ type, text }) {

  return (
    <div className={type === "user" ? "user" : "ai"}>
      {type === "user" ? "You: " : "AI: "}
      {text}
    </div>
  );

}

export default Message;