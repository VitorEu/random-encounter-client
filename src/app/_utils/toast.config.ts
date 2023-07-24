import { ToastOptions } from "react-toastify";

const toastConfig: ToastOptions<{}> = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

export default toastConfig;