const Error = ({ message }) => {
  return (
    <h2
      style={{
        textAlign: "center",
        color: "red",
        marginTop: "50px",
      }}
    >
      {message}
    </h2>
  )
}

export default Error