import toast from "react-hot-toast";

function ToastSuccess() {
  return (
    <>
      {toast.success("Todo Updated Successfully", {
        position: "top-center",
        duration: 4000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
        iconTheme: {
          primary: "rgb(16 194 0)",
          secondary: "#fff",
        },
      })}
    </>
  );
}
export default ToastSuccess;
