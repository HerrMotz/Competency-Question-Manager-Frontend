import { useStore } from "../store.ts";
export default function authHeader() {
    const useStore1 = useStore()
    const { getUser } = useStore1
    const user = getUser

    // TODO: add a check for token validity
    //  either check for the timestamp or "ping" using the current token (if a 401 is returned the token is invalid)

    if (user && user.accessToken) {
        return { 'Authorization': user.accessToken };
    } else {
        return {};
    }
}