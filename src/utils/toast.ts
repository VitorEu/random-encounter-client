import { ToastOptions, toast } from "react-toastify";

export const toastConfig: ToastOptions<{}> = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

const error = (label: string) => {
    toast.error(label, toastConfig)
}

const warning = (label: string) => {
    toast.warning(label, toastConfig)
}

const info = (label: string) => {
    toast.error(label, toastConfig)
}

const success = (label: string) => {
    toast.success(label, toastConfig)
}

const normal = (label: string) => {
    toast(label, toastConfig)
}

export {
    error,
    warning,
    info,
    success,
    normal
}
