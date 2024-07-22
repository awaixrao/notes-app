




export const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if(token) {
        return token
    }
    return null;
}